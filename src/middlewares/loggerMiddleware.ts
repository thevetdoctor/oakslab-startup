import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { appName } from 'src/utils';
const { format, createLogger, transports } = require('winston');

const enumerateErrorFormat = format((info: Error) => {
  if (info instanceof Error) {
    // console.log(info);
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Ensure the logs directory exists
const logsDirectory = path.join(
  __dirname,
  `./../../${appName.toLocaleLowerCase()}_logss`,
);
if (!fs.existsSync(logsDirectory)) {
  try {
    fs.mkdirSync(logsDirectory, { mode: 0o777 });
  } catch (err: any) {
    console.error(`Failed to create logs directory: ${err.message}`);
  }
}

export const loggers = createLogger({
  level: 'info',
  format: format.combine(
    enumerateErrorFormat(),
    format.colorize(),
    format.errors({ stack: true }),
    format.printf(
      ({ level, message }: { level: any; message: any }) =>
        `[ ${level} ]: ${new Date().toLocaleString()} => ${message}`,
    ),
  ),
  json: true,
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
    new transports.File({
      filename: path.join(logsDirectory, getLogFileName()),
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' }),
  ],
});

// Helper function to get the log file name based on the current date
function getLogFileName() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `log-${year}-${month}-${day}.log`;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    const originalSend = response.send.bind(response);
    const reqBody = body;
    let logged = false;

    response.send = (body: any): Response => {
      if (logged) return originalSend(body);
      logged = true;

      const { statusCode } = response;
      const parsedBody = typeof body === 'string' ? body : JSON.stringify(body);
      const contentLength = `${Buffer.byteLength(parsedBody)} kb` || '0 kb';
      const success = statusCode < 400;

      const hideDefault = reqBody.operationName === 'IntrospectionQuery';
      const hide = method != 'GET' || !success;
      const logPayload = `${method} - ${originalUrl} - ${statusCode} - ${userAgent} - ${ip} - ${contentLength} - ${
        !hideDefault ? JSON.stringify(reqBody) : 'Default hidden request'
      } => ${
        hide
          ? !hideDefault
            ? parsedBody
            : 'Default hidden response'
          : 'Data hidden'
      }`;

      const type = statusCode < 400 ? 'info' : 'error';
      const payload = {
        type,
        success,
        statusCode,
        userAgent,
        ip,
        method,
        originalUrl,
        payload: reqBody,
        response: parsedBody,
        contentLength,
      };
      const logMessage = `[ ${
        success ? 'INFO' : 'ERROR'
      } ]: ${new Date().toLocaleString()} - ${logPayload}\n`;

      // Write to log file
      const logFileName = path.join(logsDirectory, getLogFileName());
      fs.appendFile(logFileName, logMessage, (err) => {
        if (err) {
          console.error(`Failed to write log to file: ${err.message}`);
        }
      });

      if (statusCode >= 400) {
        this.logger.error(logPayload);
      } else {
        this.logger.log(logPayload);
      }

      return originalSend(body);
    };

    next();
  }
}

export const logHttp = (msg) => {
  const logFileName = path.join(logsDirectory, getLogFileName());
  const logMessage = `HTTP INFO: ${new Date().toLocaleString()} => ${msg}`;

  fs.appendFile(logFileName, logMessage, (err) => {
    if (err) {
      console.error(`Failed to write log to file: ${err.message}`);
    }
  });
};
