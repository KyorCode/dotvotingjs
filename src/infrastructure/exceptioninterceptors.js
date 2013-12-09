var logger = require('./log');

function serverExceptionInterceptor(err, req, res, next) {
    logger.error("Server error ::", err);
    next(err);
};

function clientExceptionInterceptor(err, req, res, next) {
    if (req.xhr) {
        logger.error("Client error ::", err)
        res.send(500, err);
    }
    else {
        next(err);
    }
};

function globalExceptionInterceptor(err, req, res, next) {
    res.status(500);
    res.render('errors/global', {
        error: err
    })
}

function notFoundExceptionInterceptor(req, res) {
    res.status(404).render('errors/404.html');
};

module.exports = {
    clientExceptionInterceptor: clientExceptionInterceptor,
    serverExceptionInterceptor: serverExceptionInterceptor,
    globalExceptionInterceptor: globalExceptionInterceptor,
    notFoundExceptionInterceptor: notFoundExceptionInterceptor
};