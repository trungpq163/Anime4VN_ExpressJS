const db = require('../../db');

module.exports.index = (req, res, next) => {
    let items = db.get("itemsAnime").value();
    res.render('allAnime', {
        items: items
    });
}