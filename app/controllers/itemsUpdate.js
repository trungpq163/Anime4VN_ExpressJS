const db = require('../../db');

module.exports.createItems = (req, res, next) => {
    res.render('itemsUpdate/create')
    next();
}

module.exports.postCreateItems = (req, res, next) => {
    next();
}