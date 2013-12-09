function getIndex(req, res) {
    res.render('home/index.html');
};

function init(app) {
    app.get('/', getIndex);
}

module.exports = {
    init: init
}