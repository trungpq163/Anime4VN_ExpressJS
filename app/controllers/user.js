const db = require('../../db');

module.exports.home = function (req, res, next) {
    let id = req.param.id;
    let users = db.get('users').find({
        id: id
    }).value();

    res.render('user/home', {
        users: users
    });
    next();
}

module.exports.index = function (req, res, next) {
    res.render('user/home');
    next();
}