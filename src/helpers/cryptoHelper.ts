import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPT_TOKEN;

export const encrypt = (text: string) => {
  const iv = randomBytes(16);

  const cipher = createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (encrypted: string, iv:string) => {
  const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
