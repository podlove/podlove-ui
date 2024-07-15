
export const etag = async (input: any): Promise<string> => {
  const entity = JSON.stringify(input);

  const textAsBuffer = new TextEncoder().encode(entity);
  const hashBuffer = await crypto.subtle.digest("SHA-1", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");

  const len = Buffer.byteLength(entity, 'utf8');

  return len.toString(16) + '-' + Buffer.from(hash).toString('base64').substring(0, 27);
}
