module.exports.postSignUp = (req, res, next) => {
    let errors = [];

    if (!req.body.name) {
        errors.push('Bạn chưa nhập họ tên.');
    }

    if (!req.body.email) {
        errors.push('Bạn chưa nhập email.');
    }

    if (!req.body.password) {
        errors.push('Bạn chưa nhập mật khẩu.');
    }

    if (!req.file) {
        errors.push('Bạn chưa tải avatar.');
    }

    if (errors.length > 0) {
        res.render('auth/signup', {
            errors: errors,
            values: req.body
        });
        return;
    }
    res.locals.success = true;
    next();
}