module.exports.login = (req, res, next) => {
    res.render('auth/login');
    next();
}

module.exports.signUp = (req, res, next) => {
    res.render('auth/signup');
    next();
}

module.exports.postSignUp = (req, res, next) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    req.body.password = md5(req.body.password);

    db.get('users').push(req.body).write();
    res.redirect('/auth/login');
    next();
}