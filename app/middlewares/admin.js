const db = require('../../db');

module.exports.requireAdmin = function (req, res, next) {
    if (!req.signedCookies.adminId) {
        res.redirect('/admin/check');
        return;
    }

    let admin = db.get('admin').find({
        id: req.signedCookies.adminId
    }).value();

    if (!admin) {
        res.redirect('/admin/check');
        return;
    }

    res.locals.admin = admin;
    next();
};

module.exports.requireKey = (req, res, next) => {
    if (!req.signedCookies.keyId) {
        res.redirect('/admin/check');
        return;
    }

    let keyAd = db.get('keyAdmin').find({
        id: req.signedCookies.key
    }).value();

    if (!keyAd) {
        res.redirect('admin/check');
        return;
    }

    res.locals.keyAd = keyAd;
    next();
}

module.exports.checkAdmin = function (req, res, next) {
    let admin = db.get('admin').find({
        id: req.signedCookies.adminId
    }).value();

    res.locals.admin = admin;
    next();
}