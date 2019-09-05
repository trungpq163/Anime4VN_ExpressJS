const db = require('../../db');

module.exports.index = (req, res, next) => {
    let items = db.get("itemsAnime").value();
    // favorite
    let userId = req.signedCookies.userId;
    let userFavorite = db
        .get("favorite")
        .filter({
            userId: userId
        })
        .value();

    let arrFavorite = [];
    for (let i = 0; i < userFavorite.length; i++) {
        arrFavorite.push(userFavorite[i].url);
    }

    res.render('allAnime', {
        items: items,
        arrFavorite: arrFavorite
    });
}