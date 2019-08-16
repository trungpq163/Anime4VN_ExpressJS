const db = require('../../db');

module.exports.index = (req, res, next) => {
    let users = db.get('users').value();
    let items = db.get('items').value();
    res.render('index', {
        users: users,
        items: items
    });
    next();
}