const path = require("path");
const winston = require("winston");
const fs = require("fs");

const logDir = path.join(process.cwd(), "logs");
if (process.env.NODE_ENV !== "production") {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
}


// BASE TRANSPORTS
const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
];

// ENABLE FILE LOGS IN DEVELOPMENT
if (process.env.NODE_ENV !== "production") {
    transports.push(
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error"
        }),
        new winston.transports.File({
            filename: path.join(logDir, "combined.log")
        })
    );
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: "auth-service" },
    transports
})

module.exports = logger;