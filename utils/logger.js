const { createLogger, format, transports } = require('winston');
module.exports = createLogger({
transports:
    new transports.File({
    filename: 'logs/server'+new Date().toLocaleDateString().replace(/\D/g, '')+'.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.label({label: `Label🏷️`}),
        format.printf(info => `${info.label} : ${[info.timestamp]}: ${info.message}`),
    )}),
});
