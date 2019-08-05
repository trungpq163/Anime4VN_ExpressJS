module.exports = {
    home: (req, res, next) => {
        res.render('user/home')
        next();
    }
};