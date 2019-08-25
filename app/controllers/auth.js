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

module.exports.changePass = (req, res, next) => {
    res.render('auth/change');
    next();
}

module.exports.putChangePass = (req, res, next) => {
    let id = req.signedCookies.userId;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let reNewPassword = req.body.reNewPassword;
    let md5NewPassword = md5(newPassword);

    let user = db.get('users').find({
        id: id
    }).value();

    if (user.password !== password) {
        let hashedPassword = md5(password);
        if (user.password !== hashedPassword) {
            res.render('auth/change', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
            });
            return;
        }
    }

    if (newPassword !== reNewPassword) {
        res.render('auth/change', {
            errors: [
                'Wrong new password.'
            ],
            values: req.body
        });
        return;
    }

    // change password
    db.get('users')
        .find({
            id: id
        })
        .assign({
            password: md5NewPassword
        })
        .write();

    res.redirect('/');
    next();
}

module.exports.forgotPass = (req, res, next) => {
    res.render('auth/forgot')
    next();
}

module.exports.putForgotPass = (req, res, next) => {
    let email = req.body.email;
    let name = req.body.name;
    let newPass = req.body.newPassword;
    let reNewPass = req.body.reNewPassword;
    let md5NewPass = md5(newPass);

    let user = db.get('users').find({
        email: email,
        name: name
    }).value();

    // check user
    if (user === undefined) {
        res.render('auth/forgot', {
            errors: [
                'User underfinded'
            ],
            values: req.body
        });
        return;
    }

    res.redirect('/');
    next();
}