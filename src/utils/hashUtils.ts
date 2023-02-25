import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

const saltRounds = +process.env.CRYPT_SALT || 10;

export const getPasswordHash = async (plaintextPassword: string) => {
  return await bcrypt.hash(plaintextPassword, saltRounds);
};

export const isPasswordMatchHash = async (
  plaintextPassword: string,
  hash: string,
) => {
  return await bcrypt.compare(plaintextPassword, hash);
};
