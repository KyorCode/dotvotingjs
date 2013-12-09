var config = require('./config');
var app = require('./bootstrap')(config).application;
var expressSettings = config.expressSettings;
var logger = require('./infrastructure/log');

app.listen(expressSettings.port, expressSettings.ip, function(error) {
    "use strict";
    if(error)    {
        logger.error("Unable to listen for connections.",error);
        process.exit(10);
    }
    logger.info("Express is listening on http://" + expressSettings.ip + ":" + expressSettings.port);
});