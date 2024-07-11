export class ParserException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParserException';
  }
}

export class Parser {
  private static readonly LF = '\u000A';
  private static readonly FF = '\u000C';
  private static readonly CR = '\u000D';
  private static readonly SPACE = '\u0020';
  private static readonly TAB = '\u0009';
  private static readonly AMP = '\u0026';

  private pos: number = 0;
  private line: number = 1;
  private content: string = '';

  private cues: any[] = [];

  public parse(content: string) {
    this.pos = 0;
    this.line = 1;
    this.content = content;
    this.cues = [];

    // NULL -> REPLACEMENT
    this.content = this.content.replace(/\u0000/g, '\uFFFD');
    // CRLF -> LF
    this.content = this.content.replace(new RegExp(Parser.CR + Parser.LF, 'g'), Parser.LF);
    // CR -> LF
    this.content = this.content.replace(new RegExp(Parser.CR, 'g'), Parser.LF);

    this.skipBom();
    this.skipSignature();
    this.skipSignatureTrails();
    this.skipLineTerminator();
    // todo: there may be a header in between here
    this.skipLineTerminator();

    if (this.isEndReached()) {
      return { cues: [] };
    }

    while (!this.isEndReached()) {
      const block = this.readBlock();
      if (block) {
        this.cues.push(block);
      }
    }

    return {
      cues: this.cues
    };
  }

  private next(length: number = 1, offset: number = 0) {
    return this.content.substring(this.pos + offset, this.pos + offset + length);
  }

  private readLine() {
    let line = '';

    while (this.next() !== Parser.LF && this.pos < this.content.length) {
      line += this.next();
      this.pos++;
    }

    this.line++;

    if (this.next() === Parser.LF) {
      this.pos++;
    }

    return line;
  }

  private readBlock() {
    let blockLineNo = 0;
    let start = 0;
    let end = 0;
    let seenArrow = false;
    let buffer = '';
    let identifier = '';

    do {
      const prevPos = this.pos;
      const line = this.readLine();
      blockLineNo++;

      if (line.includes('-->') && !seenArrow) {
        if (blockLineNo > 2) break;
        seenArrow = true;

        this.pos = prevPos;
        this.skipWhitespace();
        start = this.readTimestamp();
        this.skipWhitespace();
        this.skipArrow();
        this.skipWhitespace();
        end = this.readTimestamp();
        this.skipNewline();
      } else if (line.trim() === '') {
        break;
      } else if (Parser.isFirstCommentLine(line)) {
        this.skipNote();
        return null;
      } else if (blockLineNo === 1) {
        identifier = line;
      } else if (blockLineNo > 1 && identifier && !start && !end) {
        this.exit('Cue identifier cannot be standalone');
      } else {
        buffer += line;
      }
    } while (!this.isEndReached());

    if (!this.isEndReached()) {
      this.skipNewline();
    }

    if (identifier && !seenArrow) {
      this.exit('Cue identifier cannot be standalone.');
    }

    const [voice, text] = this.extractVoiceFromText(buffer);

    return {
      start,
      end,
      text,
      identifier,
      voice
    };
  }

  private extractVoiceFromText(text: string): [string, string] {
    let voice = '';

    if (!text.startsWith('<v')) {
      return [voice, text];
    }

    const regex = /<v(?:\.[^>]*)?\s+([^>]+)>(.*?)(<\/v>|$)/;
    const matches = regex.exec(text);

    if (!matches) {
      return [voice, text];
    }

    voice = matches[1].trim();
    text = matches[2].trim();

    return [voice, text];
  }

  private static isFirstCommentLine(line: string): boolean {
    return line === 'NOTE' || line.startsWith('NOTE ');
  }

  private readTimestamp(): number {
    let mostSignificantUnits = 'minutes';

    if (!Parser.isAsciiDigit(this.next())) {
      this.exitExpected('digit');
    }

    const int = this.readInteger();
    let value1 = int.int;

    if (int.int > 59 || int.str.length !== 2) {
      mostSignificantUnits = 'hours';
    }

    this.skipColon();

    const value2 = this.readNDigitInteger(2);

    let value3: number;
    if (mostSignificantUnits === 'hours' || (!this.isLineEndReached() && this.next() === ':')) {
      this.skipColon();
      value3 = this.readNDigitInteger(2);
    } else {
      value3 = value2;
      value2 = value1;
      value1 = 0;
    }

    this.skipFullStop();

    const value4 = this.readNDigitInteger(3);

    if (value2 > 59) {
      this.exit('Error when parsing Timestamp: minutes > 59');
    }
    if (value3 > 59) {
      this.exit('Error when parsing Timestamp: seconds > 59');
    }

    return value1 * 3600 + value2 * 60 + value3 + value4 / 1000;
  }

  private readInteger(): { str: string; int: number } {
    if (!Parser.isAsciiDigit(this.next())) {
      this.exitExpected('integer', 'Error when parsing Timestamp');
    }

    let buf = '';
    while (Parser.isAsciiDigit(this.next())) {
      buf += this.next();
      this.pos++;
    }

    return {
      str: buf,
      int: parseInt(buf, 10)
    };
  }

  private readNDigitInteger(n: number): number {
    const int = this.readInteger();

    if (int.str.length !== n) {
      this.exitExpected(`${n}-digit integer`, 'Error when parsing Timestamp');
    }

    return int.int;
  }

  private skipNote() {
    while (this.next() !== Parser.LF && !this.isEndReached()) {
      this.pos++;
    }
    if (!this.isEndReached()) {
      this.pos++;
    }
  }

  private skipWhitespace() {
    const whitespace = [Parser.TAB, Parser.LF, Parser.FF, Parser.CR, Parser.SPACE];
    while (whitespace.includes(this.next()) && !this.isEndReached()) {
      this.pos++;
    }
  }

  private skipNewline() {
    while (this.next() === Parser.LF && !this.isEndReached()) {
      this.pos++;
    }
  }

  private skipArrow() {
    if (this.next(3) === '-->') {
      this.pos += 3;
    } else {
      this.exitExpected('-->');
    }
  }

  private skipFullStop() {
    if (this.next() !== '.' || this.isEndReached()) {
      this.exitExpected('FULL STOP (.)', 'Error when parsing Timestamp');
    }
    this.pos++;
  }

  private skipColon() {
    if (this.next() !== ':' || this.isEndReached()) {
      this.exitExpected('COLON (:)', 'Error when parsing Timestamp');
    }
    this.pos++;
  }

  private skipBom() {
    const bom = String.fromCharCode(239, 187, 191);

    if (this.next(3) === bom) {
      this.pos += 3;
    }
  }

  private skipSignature() {
    if (this.next(6) === 'WEBVTT') {
      this.pos += 6;
    } else {
      this.exit('Missing WEBVTT at beginning of file');
    }
  }

  private skipSignatureTrails() {
    if ([Parser.SPACE, Parser.TAB].includes(this.next())) {
      this.pos++;
      while (this.next() !== Parser.LF && !this.isEndReached()) {
        this.pos++;
      }
    }
  }

  private skipLineTerminator() {
    if (this.next() === Parser.LF) {
      this.pos++;
      this.line++;
    } else {
      this.exitExpected('line terminator');
    }
  }

  private isEndReached(): boolean {
    return this.pos >= this.content.length;
  }

  private isLineEndReached(): boolean {
    return this.next() === Parser.LF;
  }

  private static isAsciiDigit(digit: string): boolean {
    return /^[0-9]$/.test(digit);
  }

  private exit(message: string = 'Error'): void {
    throw new ParserException(`${message} at line ${this.line}, pos ${this.pos}`);
  }

  private exitExpected(expected: string, received: string = 'unknown'): void {
    throw new ParserException(
      `Expected "${expected}" but received "${received}" at line ${this.line}, pos ${this.pos}`
    );
  }
}
