const db = require('../../db');

module.exports.index = (req, res, next) => {
    let items = [];
    res.render('search/index', {
        items: items
    });
    next();
}

module.exports.search = (req, res, next) => {
    let q = req.query.q;
    let items = db
        .get("itemsAnime")
        .value()
        .filter(function (item) {
            return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    res.render('search/search', {
        items: items
    });
    next();
}