const db = require('../../db');
const shortid = require('shortid');
const md5 = require('md5');

module.exports.login = (req, res, next) => {
    let admin = db.get('admin').value();
    res.render('admin/login', {
        admin: admin
    });
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
    req.body.avatar = req.file.path.slice(7, lenghtAvatarPath);
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