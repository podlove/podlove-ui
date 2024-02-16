import crypto from 'crypto';

export const etag = (input: any): string => {
  const entity = JSON.stringify(input);
  const hash = crypto.createHash('sha1').update(entity, 'utf8').digest('base64').substring(0, 27);
  const len = Buffer.byteLength(entity, 'utf8');

  return len.toString(16) + '-' + hash;
};
