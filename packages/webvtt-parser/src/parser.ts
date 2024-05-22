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
    .replaceAll(`${CR}.${LF}`, '\u{FFFD}')
    // CR -> LF
    .replaceAll(CR, LF);

export default (input: string) => {
  let pos = 0;
  let line = 1;
  const cues = [];

  const content = normalize(input);

  const next = (length: number = 1, offset: number = 0): string =>
    content.substring(pos + offset, length);

  const exit = (message: string = 'Error') => {
    throw new Error(`${message} at line ${line}, pos ${pos}`);
  };

  const skipBOM = () => {
    const bom = String.fromCharCode(239, 187, 191);

    if (next(3) === bom) {
      pos += 3;
    }
  };

  const skipSignature = () => {
    if (next(6) == 'WEBVTT') {
      pos += 6;
    } else {
      exit('Missing WEBVTT at beginning of file');
    }
  };

  skipBOM();
  skipSignature();

  return {};
};

// <?php

// namespace Podlove\Webvtt;

// class ParserException extends \Exception
// {
// }

// /**
//  * NOTES.
//  *
//  * - this is great: https://w3c.github.io/webvtt/
//  */
// class Parser
// {

//     public function parse($content)
//     {

//         $this->skip_signature();
//         $this->skip_signature_trails();
//         $this->skip_line_terminator();
//         // todo: there may be a header in between here
//         $this->skip_line_terminator();

//         if ($this->is_end_reached()) {
//             return ['cues' => []];
//         }

//         while (!$this->is_end_reached()) {
//             if ($block = $this->read_block()) {
//                 $this->cues[] = $block;
//             }
//         }

//         return [
//             'cues' => $this->cues,
//         ];
//     }

//     private function next($length = 1, $offset = 0)
//     {
//         return substr($this->content, $this->pos + $offset, $length);
//     }

//     /**
//      * Reads and returns current line.
//      *
//      * Advances $pos and $line.
//      *
//      * @return string
//      */
//     private function read_line()
//     {
//         $line = '';

//         while (($c = $this->next()) !== self::LF && $this->pos < strlen($this->content)) {
//             ++$this->pos;
//             $line .= $c;
//         }

//         ++$this->line;

//         if ($c === self::LF) {
//             ++$this->pos;
//         }

//         return $line;
//     }

//     /**
//      * Reads and returns current block.
//      *
//      * Advances $pos and $line.
//      *
//      * @return string
//      */
//     private function read_block()
//     {
//         $block_line_no = 0;
//         $start = 0;
//         $end = 0;
//         $seen_arrow = false;
//         $buffer = '';
//         $identifier = '';

//         do {
//             $prev_pos = $this->pos;
//             $line = $this->read_line();
//             ++$block_line_no;

//             if (strpos($line, '-->') && !$seen_arrow) {
//                 if ($block_line_no > 2) {
//                     break;
//                 }
//                 $seen_arrow = true;

//                 $this->pos = $prev_pos;
//                 $this->skip_whitespace();
//                 $start = $this->read_timestamp();
//                 $this->skip_whitespace();
//                 $this->skip_arrow();
//                 $this->skip_whitespace();
//                 $end = $this->read_timestamp();
//                 $this->skip_newline();
//             } elseif (empty($line)) {
//                 break;
//             } elseif (self::is_first_comment_line($line)) {
//                 $this->skip_note();

//                 return null;
//             } elseif ($block_line_no === 1) {
//                 $identifier = $line;
//             } elseif ($block_line_no > 1 && $identifier && !$start && !$end) {
//                 $this->exit('missing cue timings');
//             } else {
//                 $buffer .= $line;
//             }
//         } while (!$this->is_end_reached());

//         if (!$this->is_end_reached()) {
//             $this->skip_newline();
//         }

//         if (!empty($identifier) && !$seen_arrow) {
//             $this->exit('Cue identifier cannot be standalone.');
//         }

//         list($voice, $text) = $this->extract_voice_from_text($buffer);

//         return [
//             'start' => $start,
//             'end' => $end,
//             'text' => $text,
//             'identifier' => $identifier,
//             'voice' => $voice,
//         ];
//     }

//     /**
//      * Simplistic cue text parsing.
//      *
//      * Want to do it properly?
//      *
//      * @see  https://w3c.github.io/webvtt/#webvtt-cue-text-parsing-rules
//      *
//      * @param string $text
//      *
//      * @return [string, string]
//      */
//     private function extract_voice_from_text($text)
//     {
//         $voice = '';

//         if (substr($text, 0, 2) !== '<v') {
//             return [$voice, $text];
//         }

//         if (!preg_match('/<v[^\\s]*[\\s]+([^>]+)>(.*?)(<\/v[^>]*>|$)/', $text, $matches)) {
//             return [$voice, $text];
//         }

//         $voice = trim($matches[1]);
//         $text = trim($matches[2]);

//         return [$voice, $text];
//     }

//     /**
//      * Is this the first line of a comment?
//      *
//      * A comment startes with "NOTE", followed by a space or newline.
//      *
//      * @param  string
//      * @param mixed $line
//      *
//      * @return bool
//      */
//     private static function is_first_comment_line($line)
//     {
//         return strlen($line) === 4 && $line === 'NOTE' || substr($line, 0, 5) === 'NOTE'.self::SPACE;
//     }

//     private function read_timestamp()
//     {
//         $most_significant_units = 'minutes';

//         if (!self::is_ascii_digit($this->next())) {
//             $this->exit_expected('digit');
//         }

//         $int = $this->read_integer();
//         $value1 = $int['int'];

//         if ($int['int'] > 59 || strlen($int['str']) !== 2) {
//             $most_significant_units = 'hours';
//         }

//         $this->skip_colon();

//         $value2 = $this->read_n_digit_integer(2);

//         if ($most_significant_units === 'hours' || !$this->is_line_end_reached() && $this->next() == ':') {
//             $this->skip_colon();
//             $value3 = $this->read_n_digit_integer(2);
//         } else {
//             $value3 = $value2;
//             $value2 = $value1;
//             $value1 = 0;
//         }

//         $this->skip_full_stop();

//         $value4 = $this->read_n_digit_integer(3);

//         if ($value2 > 59) {
//             $this->exit('Error when parsing Timestamp: minutes > 59');
//         }
//         if ($value3 > 59) {
//             $this->exit('Error when parsing Timestamp: seconds > 59');
//         }

//         return $value1 * 60 * 60 + $value2 * 60 + $value3 + $value4 / 1000;
//     }

//     private function read_integer()
//     {
//         if (!self::is_ascii_digit($this->next())) {
//             $this->exit_expected('integer', 'Error when parsing Timestamp');
//         }

//         $buf = '';
//         do {
//             $buf .= $this->next();
//             ++$this->pos;
//         } while (self::is_ascii_digit($this->next()));

//         return [
//             'str' => $buf,
//             'int' => intval($buf, 10),
//         ];
//     }

//     private function read_n_digit_integer($n)
//     {
//         $int = $this->read_integer();

//         if (strlen($int['str']) !== $n) {
//             $this->exit_expected("{$n}-digit integer", 'Error when parsing Timestamp');
//         }

//         return $int['int'];
//     }

//     private function skip_note()
//     {
//         if ($this->next() === self::LF) {
//             ++$this->pos;
//         } else {
//             while ($this->next(2) !== self::LF.self::LF && !$this->is_end_reached()) {
//                 ++$this->pos;
//             }
//         }
//         $this->skip_newline();
//     }

//     private function skip_whitespace()
//     {
//         $whitespace = [
//             self::TAB,
//             self::LF,
//             self::FF,
//             self::CR,
//             self::SPACE,
//         ];
//         while (in_array($this->next(), $whitespace) && !$this->is_end_reached()) {
//             ++$this->pos;
//         }
//     }

//     private function skip_newline()
//     {
//         while ($this->next() === self::LF && !$this->is_end_reached()) {
//             ++$this->pos;
//         }
//     }

//     private function skip_arrow()
//     {
//         if ($this->next(3) == '-->') {
//             $this->pos += 3;
//         } else {
//             $this->exit_expected('-->');
//         }
//     }

//     private function skip_full_stop()
//     {
//         if ($this->next() !== '.' || $this->is_end_reached()) {
//             $this->exit_expected('FULL STOP (.)', 'Error when parsing Timestamp');
//         }
//         ++$this->pos;
//     }

//     private function skip_colon()
//     {
//         if ($this->next() !== ':' || $this->is_end_reached()) {
//             $this->exit_expected('COLON (:)', 'Error when parsing Timestamp');
//         }
//         ++$this->pos;
//     }

//     private function skip_signature()
//     {
//         if ($this->next(6) == 'WEBVTT') {
//             $this->pos += 6;
//         } else {
//             $this->exit('Missing WEBVTT at beginning of file');
//         }
//     }

//     private function skip_signature_trails()
//     {
//         if (in_array($this->next(), [self::SPACE, self::TAB])) {
//             ++$this->pos;
//             while ($this->next() !== self::LF && !$this->is_end_reached()) {
//                 ++$this->pos;
//             }
//         }
//     }

//     private function skip_line_terminator()
//     {
//         if ($this->next() === self::LF) {
//             ++$this->pos;
//             ++$this->line;
//         } else {
//             $this->exit_expected('line terminator');
//         }
//     }

//     private function is_end_reached()
//     {
//         return $this->pos + 1 >= strlen($this->content);
//     }

//     private function is_line_end_reached()
//     {
//         return $this->next() === self::LF;
//     }

//     private static function is_ascii_digit($digit)
//     {
//         return preg_match('/^[0-9]$/', $digit) === 1;
//     }

//     private function exit($message = 'Error')
//     {
//         throw new ParserException("{$message} at line {$this->line}, pos {$this->pos}");
//     }

//     private function exit_expected($thing, $message = '')
//     {
//         if (strlen($message) > 0) {
//             $message = trim($message).'. ';
//         }

//         throw new ParserException("{$message}Expected \"{$thing}\", got \"".$this->next()."\" at line {$this->line}, pos {$this->pos}");
//     }
// }
