module.exports.index = (req, res, next) => {
    let user = db.get('users').value();
    res.render('index', {
        user: user
    });
    next();
}