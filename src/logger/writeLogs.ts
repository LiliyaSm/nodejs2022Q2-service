import { mkdir, appendFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { join } from 'path';
import * as fs from 'fs';

export const getFilePath = (dirPath, pathToJoin) => {
  const __dirname = fileURLToPath(new URL('.', dirPath));
  return path.join(__dirname, pathToJoin);
};
const dateString = new Date().toJSON().slice(0, 10);

export const saveLog = async (infoMessage: string) => {
  const dest = join(process.cwd(), 'logs');
  if (!fs.existsSync(dest)) {
    await mkdir(dest);
  }
  const name = `${dateString}.log`;
  const filepath = join(dest, name);

  await appendFile(filepath, infoMessage);
};
