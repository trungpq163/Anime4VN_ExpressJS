const db = require('../../db');
const shortid = require('shortid');

module.exports.createItems = (req, res, next) => {
    res.render('items/create')
    next();
}

module.exports.postCreateItems = (req, res, next) => {
    let lengthPathBackGround = (req.files.backGround[0].path).length;
    let lengthPathImage = (req.files.image[0].path).length;
    req.body.id = shortid.generate();
    req.body.image = req.files.image[0].path.slice(6, lengthPathImage);
    req.body.backGround = req.files.backGround[0].path.slice(6, lengthPathBackGround);
    db.get('itemsAnime').push(req.body).write();
    res.redirect('/');
    next();
}