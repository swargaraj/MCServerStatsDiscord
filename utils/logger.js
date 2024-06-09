/**
 * This module exports a logger object created using the Winston library.
 * It logs messages with a timestamp and level of severity.
 *
 * @module logger
 */

const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { join } = require("path");

/**
 * Create a logger object using Winston.
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp(), // Add a timestamp to the log messages.
    format.printf(
      ({ level, message, timestamp }) =>
        // Customize the log message format.
        `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add color to the log messages for console.
        format.timestamp(),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} [${level}]: ${message}`
        )
      ),
    }),
    // Configure a transport to write logs to a daily-rotated file.
    // The log file name will be formatted as 'YYYY-MM-DD.log'.
    // The log file will be compressed and rotated daily, with a maximum of 1 day's worth of logs.
    // Each log file will not exceed 2MB in size.
    new transports.DailyRotateFile({
      filename: join(__dirname, "..", "logs", "%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true, // Compress log files with gzip
      maxSize: "2m",
      maxFiles: "1d",
    }),
  ],
});

module.exports = logger;
