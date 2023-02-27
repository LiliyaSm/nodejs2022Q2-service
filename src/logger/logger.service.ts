import { LoggerService, Injectable } from '@nestjs/common';
import { writeLogs } from './writeLogs';

const getLogMsg = (message: string, optionalParams: string, level: string) => {
  const currentDate = new Date();
  const dateTime =
    currentDate.getDate() +
    '/' +
    (currentDate.getMonth() + 1) +
    '/' +
    currentDate.getFullYear() +
    ' @ ' +
    currentDate.getHours() +
    ':' +
    currentDate.getMinutes() +
    ':' +
    currentDate.getSeconds();
  return `${dateTime} ${level} [${optionalParams}] :  ${message}\n`;
};

@Injectable()
export class Logger implements LoggerService {
  async log(message: string, optionalParams: any): Promise<void> {
    const infoMessage = getLogMsg(message, optionalParams, 'LOG');
    await writeLogs(infoMessage, 'LOG');
  }

  async error(message: string, optionalParams: any): Promise<void> {
    const infoMessage = getLogMsg(message, optionalParams, 'ERROR');
    await writeLogs(infoMessage, 'ERROR');
  }

  async warn(message: string, optionalParams: any): Promise<void> {
    const infoMessage = getLogMsg(message, optionalParams, 'WARN');
    await writeLogs(infoMessage, 'WARN');
  }

  async debug(message: string, optionalParams: any): Promise<void> {
    const infoMessage = getLogMsg(message, optionalParams, 'DEBUG');
    await writeLogs(infoMessage, 'DEBUG');
  }

  async verbose(message: string, optionalParams: any): Promise<void> {
    const infoMessage = getLogMsg(message, optionalParams, 'VERBOSE');
    await writeLogs(infoMessage, 'VERBOSE');
  }
}
