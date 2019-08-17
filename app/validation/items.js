module.exports.postCreateItems = (req, res, next) => {
    let errors = [];

    if (!req.body.title) {
        errors.push('Bạn chưa nhập title.');
    }

    if (!req.body.ortherTitle) {
        errors.push('Bạn chưa nhập orther title.');
    }

    if (!req.body.scores) {
        errors.push('Bạn chưa nhập tập scores.');
    }

    if (!req.body.status) {
        errors.push('Bạn chưa nhập status.');
    }

    if (!req.body.genre) {
        errors.push('Bạn chưa nhập genre.');
    }

    if (!req.file) {
        errors.push('Bạn chưa tải Image.');
    }

    if (!req.file) {
        errors.push('Bạn chưa tải background');
    }

    if (errors.length > 0) {
        res.render('items/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    res.locals.success = true;
    next();
};