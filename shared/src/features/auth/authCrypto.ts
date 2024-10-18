import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-ctr';

/**
 * 指定されたキーを使って秘密鍵を生成する関数
 * @param cryptoSecretKey - 環境変数などで設定された秘密鍵のベースとなる文字列
 * @returns 32文字の秘密鍵
 */
const createSecretKey = (cryptoSecretKey: string): string => {
  return createHash('sha256').update(cryptoSecretKey).digest('base64').slice(0, 32);
};

/**
 * 暗号化
 * @param text - 暗号化したい文字列
 * @param secretKey - 暗号化に使用する秘密鍵
 * @returns 暗号化された文字列
 */
export const encrypt = (text: string, secretKey: string): string => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, createSecretKey(secretKey), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * 復号化
 * @param hash - 暗号化データを含むハッシュ文字列
 * @param secretKey - 復号化に使用する秘密鍵
 * @returns 復号化された文字列
 */
export const decrypt = (hash: string, secretKey: string): string => {
  const [ivHex, encryptedHex] = hash.split(':');
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const decipher = createDecipheriv(algorithm, createSecretKey(secretKey), ivBuffer);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedHex, 'hex')), decipher.final()]);

  return decrypted.toString();
};
