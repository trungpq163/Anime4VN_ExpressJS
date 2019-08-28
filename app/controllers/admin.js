const db = require('../../db');
const shortid = require('shortid');
const md5 = require('md5');

module.exports.login = (req, res, next) => {
    let admin = db.get('admin').value();
    res.render('admin/login');
    next();
}

module.exports.postLogin = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let admin = db.get('admin').find({
        email: email
    }).value();

    if (!admin) {
        res.render('admin/login', {
            errors: [
                'Admin does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if (admin.password !== password) {
        let hashedPassword = md5(password);
        if (admin.password !== hashedPassword) {
            res.render('admin/login', {
                errors: [
                    'Wrong a Password.'
                ],
                values: req.body
            });
            return;
        }
    }
    res.cookie('adminId', admin.id, {
        signed: true
    });

    res.redirect('/');
    next();
}

module.exports.signUp = (req, res, next) => {
    res.render('admin/signup');
    next();
}

module.exports.postSignUp = (req, res, next) => {
    let lenghtAvatarPath = (req.file.path).length;

    req.body.id = shortid.generate();
    // req.body.avatar = req.file.path.split('/').slice(1).join('/');
    req.body.avatar = req.file.path.slice(6, lenghtAvatarPath);
    req.body.password = md5(req.body.password);

    db.get('admin').push(req.body).write();
    res.redirect('/admin/login');
    next();
}

module.exports.logout = (req, res, next) => {
    res.clearCookie('adminId');
    res.redirect('/');
    next();
}

module.exports.validateAdmin = (req, res, next) => {
    res.render('admin/check');
    next();
}

module.exports.postValidateAdmin = (req, res, next) => {
    let key = req.body.key;
    let importKey = db.get('keyAdmin').find({
        key: key
    }).value();

    if (importKey === undefined) {
        res.render('admin/check', {
            errors: [
                'Wrong key admin.'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('keyId', importKey, {
        signed: true
    });

    res.redirect('/admin/signup');
    next();
}

module.exports.changePass = (req, res, next) => {
    res.render('admin/change');
    next();
}

module.exports.putChangePass = (req, res, next) => {
    let id = req.signedCookies.adminId;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let reNewPassword = req.body.reNewPassword;
    let md5NewPassword = md5(newPassword);

    let user = db.get('admin').find({
        id: id
    }).value();

    if (user.password !== password) {
        let hashedPassword = md5(password);
        if (user.password !== hashedPassword) {
            res.render('admin/change', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
            });
            return;
        }
    }

    if (newPassword !== reNewPassword) {
        res.render('admin/change', {
            errors: [
                'Wrong new password.'
            ],
            values: req.body
        });
        return;
    }

    // change password
    db.get('admin')
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
    res.render('admin/forgot')
    next();
}

module.exports.putForgotPass = (req, res, next) => {
    let email = req.body.email;
    let name = req.body.name;
    let newPass = req.body.newPassword;
    let reNewPass = req.body.reNewPassword;
    let md5NewPass = md5(newPass);

    let user = db.get('admin').find({
        email: email,
        name: name
    }).value();

    // check user
    if (user === undefined) {
        res.render('admin/forgot', {
            errors: [
                'User underfinded'
            ],
            values: req.body
        });
        return;
    }

    // check rePassword
    if (newPass !== reNewPass) {
        res.render('admin/forgot', {
            errors: [
                'Nhập lại sai pass, vui lòng nhập lại.'
            ],
            values: req.body
        });
        return;
    }

    // change password
    db.get('admin').find({
            id: user.id
        })
        .assign({
            password: md5NewPass
        })
        .write();

    res.redirect('/');
    next();
}