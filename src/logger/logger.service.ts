import { LoggerService, Injectable } from '@nestjs/common';
import { saveLog } from './writeLogs';

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
  log(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'LOG');
    console.log(infoMessage);
    saveLog(infoMessage);
  }

  error(message: any, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'ERROR');
    console.log(infoMessage);
    saveLog(infoMessage);
  }

  warn(message: any, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'WARN');
    console.log(infoMessage);
    saveLog(infoMessage);
  }
}
