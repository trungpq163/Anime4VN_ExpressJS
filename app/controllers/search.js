const db = require('../../db');

module.exports.index = (req, res, next) => {
    res.render('search/index');
    next();
}

module.exports.search = (req, res, next) => {
    let q = req.query.q;

    let matchedItems = db
        .get("itemsAnime")
        .value()
        .filter(function (item) {
            return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    res.render('index', {
        matchedItems: matchedItems,
        items: items
    });
    next();
}