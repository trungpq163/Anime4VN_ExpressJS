const db = require('../../db');
const shortid = require('shortid');
const md5 = require('md5');

module.exports.login = (req, res, next) => {
    let users = db.get('users').value();
    res.render('auth/login', {
        users: users
    });
    next();
}

module.exports.postLogin = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    let user = db.get('users').find({
        email: email
    }).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if (user.password !== password) {
        var hashedPassword = md5(password);
        if (user.password !== hashedPassword) {
            res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
            });
            return;
        }
    }

    res.cookie('userId', user.id, {
        signed: true
    });

    res.redirect('/');
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

module.exports.logout = function (req, res, next) {
    res.clearCookie('userId');
    res.redirect('/');
    next();
}