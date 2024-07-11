const LF = '\u{000A}';
const FF = '\u{000C}';
const CR = '\u{000D}';
const SPACE = '\u{0020}';
const TAB = '\u{0009}';
const AMP = '\u{0026}';

const normalize = (input: string): string =>
  input
    // NULL -> REPLACEMENT
    .replaceAll('\u{0000}', '\u{FFFD}')
    // CRLF -> LF
    .replaceAll(`${CR}${LF}`, LF)
    // CR -> LF
    .replaceAll(CR, LF);

/**
 * NOTES.
 *
 * - this is great: https://w3c.github.io/webvtt/
 */
export default (input: string) => {
  let pos = 0;
  let line = 1;
  const cues = [];

  const content = normalize(input);
  const next = (length: number = 1): string => content.substring(pos, pos + length);

  const exit = (message: string = 'Error') => {
    throw new Error(`${message} at line ${line}, pos ${pos}`);
  };

  const skipBOM = () => {
    const bom = String.fromCharCode(239, 187, 191);

    if (next(3) === bom) {
      pos = pos + 3;
    }
  };

  const skipSignature = () => {
    if (next(6) == 'WEBVTT') {
      pos = pos + 6;
    } else {
      exit('Missing WEBVTT at beginning of file');
    }
  };

  const skipSignatureTrails = () => {
    if ([SPACE, TAB].includes(next())) {
      pos = pos + 1;

      while (next() !== LF && !isEndReached()) {
        pos = pos + 1;
      }
    }
  };

  const exitExpected = (thing, message = '') => {
    if (message.length > 0) {
      message = message.trim() + '. ';
    }

    throw new Error(`${message}Expected \"${thing}\", got "${next()}" at line ${line}, pos ${pos}`);
  };

  const skipLineTerminator = () => {
    if (next() === LF) {
      pos = pos + 1;
      line = line + 1;
    } else {
      exitExpected('line terminator');
    }
  };

  const readInteger = () => {
    if (!isAsciiDigit(next())) {
      exitExpected('integer', 'Error when parsing Timestamp');
    }

    let buf = '';

    do {
      buf = buf + next();
      pos = pos + 1;
    } while (isAsciiDigit(next()));

    return {
      str: buf,
      int: parseInt(buf, 10)
    };
  };

  const isEndReached = () => {
    return pos + 1 >= content.length;
  };

  const readLine = () => {
    let readLine = '';
    let c: string;
    while ((c = next()) !== LF && pos < content.length) {
      pos = pos + 1;
      readLine = readLine + c;
    }

    line = line + 1;

    if (c === LF) {
      pos = pos + 1;
    }

    return readLine;
  };

  const skipWhitespace = () => {
    const whitespace = [TAB, LF, FF, CR, SPACE];
    while (whitespace.includes(next()) && !isEndReached()) {
      pos = pos + 1;
    }
  };

  const isAsciiDigit = (digit: string) => {
    return isNaN(parseInt(digit, 10)) === false;
  };

  const skipColon = () => {
    if (next() !== ':' || isEndReached()) {
      exitExpected('COLON (:)', 'Error when parsing Timestamp');
    }
    pos = pos + 1;
  };

  const readNDigitInteger = (n: number) => {
    let int = readInteger();

    if (int['str'].length !== n) {
      exitExpected(`${n}-digit integer`, 'Error when parsing Timestamp');
    }

    return int['int'];
  };

  const isLineEndReached = () => {
    return next() === LF;
  };

  const skipFullStop = () => {
    if (next() !== '.' || isEndReached()) {
      exitExpected('FULL STOP (.)', 'Error when parsing Timestamp');
    }
    pos = pos + 1;
  };

  /**
   * Is this the first line of a comment?
   *
   * A comment startes with "NOTE", followed by a space or newline.
   *
   * @param  string
   * @param mixed $line
   *
   * @return bool
   */
  const isFirstCommentLine = (line: string) => {
    return (line.length === 4 && line === 'NOTE') || line.substring(0, 5) === 'NOTE' + SPACE;
  };

  /**
   * Simplistic cue text parsing.
   *
   * Want to do it properly?
   *
   * @see  https://w3c.github.io/webvtt/#webvtt-cue-text-parsing-rules
   *
   * @param string $text
   *
   * @return [string, string]
   */
  const extractVoiceFromText = (text: string) => {
    let voice = '';

    if (text.substring(0, 2) !== '<v') {
      return [voice, text];
    }

    const matches = text.match(/<v[^\s]*\s+([^>]+)>(.*?)(<\/v[^>]*>|$)/);

    if (!matches.length) {
      return [voice, text];
    }
    voice = matches[1].trim();
    text = matches[2].trim();

    return [voice, text];
  };

  const readTimestamp = () => {
    let mostSignificantUnits = 'minutes';

    if (!isAsciiDigit(next())) {
      exitExpected('digit');
    }

    const int = readInteger();

    let value1 = int['int'];

    if (int['int'] > 59 || int['str'].length !== 2) {
      mostSignificantUnits = 'hours';
    }

    skipColon();

    let value2 = readNDigitInteger(2);
    let value3;
    if (mostSignificantUnits === 'hours' || (!isLineEndReached() && next() == ':')) {
      skipColon();
      value3 = readNDigitInteger(2);
    } else {
      value3 = value2;
      value2 = value1;
      value1 = 0;
    }

    skipFullStop();

    let value4 = readNDigitInteger(3);

    if (value2 > 59) {
      exit('Error when parsing Timestamp: minutes > 59');
    }
    if (value3 > 59) {
      exit('Error when parsing Timestamp: seconds > 59');
    }

    return value1 * 60 * 60 + value2 * 60 + value3 + value4 / 1000;
  };

  const skipArrow = () => {
    if (next(3) == '-->') {
      pos = pos + 3;
    } else {
      exitExpected('-->');
    }
  };

  const skipNewline = () => {
    while (next() === LF && !isEndReached()) {
      pos = pos + 1;
    }
  };

  const skipNote = () => {
    if (next() === LF) {
      ++pos;
    } else {
      while (next(2) !== LF + LF && !isEndReached()) {
        ++pos;
      }
    }
    skipNewline();
  };

  const readBlock = () => {
    let blockLineNo = 0;
    let start = 0;
    let end = 0;
    let seenArrow = false;
    let buffer = '';
    let identifier = '';

    do {
      let prevPos = pos;
      let line = readLine();

      blockLineNo = blockLineNo + 1;

      if (line.indexOf('-->') > -1 && !seenArrow) {
        if (blockLineNo > 2) {
          break;
        }

        seenArrow = true;
        pos = prevPos;
        skipWhitespace();
        start = readTimestamp();
        skipWhitespace();
        skipArrow();
        skipWhitespace();
        end = readTimestamp();
        skipNewline();
      } else if (!line) {
        break;
      } else if (isFirstCommentLine(line)) {
        skipNote();
        return null;
      } else if (blockLineNo === 1) {
        identifier = line;
      } else if (blockLineNo > 1 && identifier && !start && !end) {
        exit('missing cue timings');
      } else {
        buffer = buffer + line;
      }
    } while (!isEndReached());

    if (!isEndReached()) {
      skipNewline();
    }

    if (!!identifier && !seenArrow) {
      exit('Cue identifier cannot be standalone.');
    }

    const [voice, text] = extractVoiceFromText(buffer.trim());

    return {
      start,
      end,
      text: text.trim(),
      ...(identifier ? { identifier } : {}),
      ...(voice ? { voice } : {})
    };
  };

  skipBOM();
  skipSignature();
  skipSignatureTrails();

  skipLineTerminator();
  // todo: there may be a header in between here
  skipLineTerminator();

  if (isEndReached()) {
    return { cues: [] };
  }

  while (!isEndReached()) {
    const block = readBlock();

    if (block) {
      cues.push(block);
    }
  }

  return {
    cues
  };
};
