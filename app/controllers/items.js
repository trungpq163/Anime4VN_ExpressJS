const db = require('../../db');
const shortid = require('shortid');

module.exports.createItems = (req, res, next) => {
    res.render('items/create')
    next();
}

module.exports.postCreateItems = (req, res, next) => {
    let lengthPath = (req.file.path).length;
    req.body.id = shortid.generate();
    req.body.backGround = req.file.path.slice(7, lengthPath);
    db.get('itemsAnime').push(req.body).write();
    res.redirect('/');
    next();
}