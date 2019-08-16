const db = require('../../db');
const shortid = require('shortid');

module.exports.createItems = (req, res, next) => {
    res.render('itemsUpdate/create')
    next();
}

module.exports.postCreateItems = (req, res, next) => {
    let lengthImagePath = (req.file.path).length;
    req.body.id = shortid.generate();
    req.body.image = req.file.path.slice(7, lengthImagePath);
    db.get('items').push(req.body).write();
    res.redirect('/');
    next();
}