module.exports.postCreateItems = (req, res, next) => {
    let errors = [];

    if (!req.body.title) {
        errors.push('Bạn chưa nhập title.');
    }

    if (!req.body.ortherTitle) {
        errors.push('Bạn chưa nhập orther Title');
    }

    if (!req.file) {
        errors.push('Bạn chưa tải Background');
    }

    if (!req.body.scores) {
        errors.push('Bạn chưa tải Scores');
    }

    if (!req.body.status) {
        errors.push('Bạn chưa nhập Status');
    }

    if (!req.body.genre) {
        errors.push('Bạn chưa nhập thể loại');
    }

    if (!req.body.season) {
        errors.push('Bạn chưa nhập mùa anime');
    }

    if (!req.body.year) {
        errors.push('Bạn chưa nhập năm sản xuất');
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