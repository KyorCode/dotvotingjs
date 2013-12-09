var express = require('express');
var path = require('path');
var doT = require('express-dot');
var findIt = require('findit')(__dirname);
var middleware = require('./infrastructure/middleware');

function setup(config) {
    "use strict";

    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'doT');
    app.engine('html', doT.__express);
    app.locals({
        layout: false
    });
    app.use(express.static(path.resolve(__dirname + '/../public')));

    findIt.on('file', function(file) {
        var filename = path.basename(file);
        if (filename === 'routes.js') {
            require('./' + path.relative(__dirname, file)).init(app);
        }
    });

    findIt.on('end', function() {
        app.use(middleware.exceptionInterceptors.serverExceptionInterceptor);
        app.use(middleware.exceptionInterceptors.clientExceptionInterceptor);
        app.use(middleware.exceptionInterceptors.globalExceptionInterceptor);
        app.use(middleware.exceptionInterceptors.notFoundExceptionInterceptor);
        app.use(app.router);
    });

    return {
        application: app
    };
}

module.exports = setup;