import { mkdir, appendFile, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { join } from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

enum LogLevels {
  'LOG',
  'ERROR',
  'WARN',
  'DEBUG',
  'VERBOSE',
}

const currentLogLevel = +process.env.LOG_LEVEL;

export const getFilePath = (dirPath, pathToJoin) => {
  const __dirname = fileURLToPath(new URL('.', dirPath));
  return path.join(__dirname, pathToJoin);
};
const dateString = new Date().toJSON().slice(0, 10);

export const writeLogs = async (
  infoMessage: string,
  logLevel: string,
): Promise<void> => {
  if (currentLogLevel <= LogLevels[logLevel]) {
    console.log(infoMessage);

    const dest = join(process.cwd(), 'logs');
    if (!fs.existsSync(dest)) {
      await mkdir(dest);
    }
    const name = `${dateString}.log`;
    const errorsFileName = `${dateString}-Errors.log`;

    const filepath = join(dest, name);
    const errorsFilepath = join(dest, errorsFileName);

    await appendFile(filepath, infoMessage);

    if (logLevel === 'ERROR') await appendFile(errorsFilepath, infoMessage);
  }
};
