import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const myFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
	let msg = `${timestamp} [${level}]: ${message} `;
	if (metadata) {
		msg += JSON.stringify(metadata);
	}
	return msg;
});

export const logger = createLogger({
	format: format.combine(
		format.colorize(),
		format.splat(),
		format.timestamp(),
		myFormat
	),
	transports: [
		new transports.Console(),
		new transports.DailyRotateFile({
			filename: 'logs/%DATE%-log.log',
			datePattern: 'YYYY-MM-DD',
			maxSize: '20m',
			maxFiles: '10d',
		}),
	],
});
