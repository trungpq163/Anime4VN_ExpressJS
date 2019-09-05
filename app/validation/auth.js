const emailRegex = require('email-regex');

module.exports.postSignUp = (req, res, next) => {
    let errors = [];
    let checkEmail = emailRegex({
        exact: true
    }).test(req.body.email);

    if (!req.body.name) {
        errors.push('Bạn chưa nhập họ tên.');
    }

    if (!req.body.email) {
        errors.push('Bạn chưa nhập email.');
    }

    if (checkEmail == false) {
        errors.push('Email không đúng định dạng');
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