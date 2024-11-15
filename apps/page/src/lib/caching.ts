export const createHash = async (input: string): Promise<string> =>
  Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input))),
    (byte) => byte.toString(16).padStart(2, '0')
  ).join('');
