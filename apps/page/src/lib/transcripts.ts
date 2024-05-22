import { parse as vttParser } from '@plussub/srt-vtt-parser';

export const parse = async (input: string): Promise<void> => {
  const result = await vttParser(input);
  console.log(result);
};
