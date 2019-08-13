module.exports.index = (req, res, next) => {
    res.render('search/index');
    next();
}