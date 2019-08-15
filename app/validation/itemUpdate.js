module.exports.postCreateItems = (req, res, next) => {
    let errors = [];

    if (!req.body.title) {
        errors.push('Bạn chưa nhập title.');
    }

    if (!req.file) {
        errors.push('Bạn chưa tải Image.');
    }

    if (!req.body.epUpdate) {
        errors.push('Bạn chưa nhập tập mới nhất.');
    }

    if (!req.body.epLast) {
        errors.push('Bạn chưa nhập tập kết thúc.');
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