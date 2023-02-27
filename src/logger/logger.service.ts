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
  log(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'LOG');
    writeLogs(infoMessage, 'LOG');
  }

  error(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'ERROR');
    writeLogs(infoMessage, 'ERROR');
  }

  warn(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'WARN');
    writeLogs(infoMessage, 'WARN');
  }

  debug(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'DEBUG');
    writeLogs(infoMessage, 'DEBUG');
  }

  verbose(message: string, optionalParams: any) {
    const infoMessage = getLogMsg(message, optionalParams, 'VERBOSE');
    writeLogs(infoMessage, 'VERBOSE');
  }
}
