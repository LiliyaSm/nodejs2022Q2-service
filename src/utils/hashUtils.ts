import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const getPasswordHash = async (plaintextPassword: string) => {
  return await bcrypt.hash(plaintextPassword, saltRounds);
};

export const isPasswordMatchHash = async (
  plaintextPassword: string,
  hash: string,
) => {
  return await bcrypt.compare(plaintextPassword, hash);
};
