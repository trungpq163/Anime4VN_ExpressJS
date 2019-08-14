const db = require('../../db');

module.exports.requireAdmin = function (req, res, next) {
    if (!req.signedCookies.adminId) {
        res.redirect('/admin/login');
        return;
    }

    let admin = db.get('admin').find({
        id: req.signedCookies.adminId
    }).value();

    if (!admin) {
        res.redirect('/admin/login');
        return;
    }

    res.locals.admin = admin;
    next();
};

module.exports.checkAdmin = function (req, res, next) {
    let admin = db.get('admin').find({
        id: req.signedCookies.adminId
    }).value();

    res.locals.admin = admin;
    next();
}

module.exports.validateAdmin = (req, res, next) => {
    next();
}