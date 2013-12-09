var winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
    new(winston.transports.Console)({
        json: false,
        timestamp: true
    })],
    exceptionHandlers: [
    new(winston.transports.Console)({
        json: false,
        timestamp: true
    })],
    exitonError: false
});

module.exports = {
    info: logger.info,
    error: logger.error
}