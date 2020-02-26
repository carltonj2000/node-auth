import appRoot from "app-root-path";
import winston from "winston";

const transports = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

const logToFile = false;
if (logToFile)
  transports.push(
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      level: "info",
      maxsize: 1024,
      maxFiles: 2,
      format: winston.format.json()
    })
  );

const logger = new winston.createLogger({ transports, exitOnError: false });

logger.stream = {
  write: (message, encoding) => logger.info(message.trim())
};

export default logger;
