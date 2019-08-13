const db = require('../../db');

module.exports.index = (req, res, next) => {
    let users = db.get('users').value();
    res.render('index', {
        users: users
    });
    next();
}