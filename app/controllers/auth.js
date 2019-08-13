const db = require('../../db');
const shortid = require('shortid');
const md5 = require('md5');

module.exports.login = (req, res, next) => {
    let user = db.get('users').value();
    res.render('auth/login', {
        user: user
    });
    next();
}

module.exports.postLogin = (req, res, next) => {

}

module.exports.signUp = (req, res, next) => {
    res.render('auth/signup');
    next();
}

module.exports.postSignUp = (req, res, next) => {
    let lenghtAvatarPath = (req.file.path).length;

    req.body.id = shortid.generate();
    // req.body.avatar = req.file.path.split('/').slice(1).join('/');
    req.body.avatar = req.file.path.slice(6, lenghtAvatarPath);
    req.body.password = md5(req.body.password);

    db.get('users').push(req.body).write();
    res.redirect('/user/home');
    next();
}