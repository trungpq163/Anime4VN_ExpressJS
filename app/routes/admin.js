const express = require('express');
const multer = require('multer');
const controller = require('../controllers/admin');
const validate = require('../validation/auth');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/login', adminMiddleware.checkAdmin, controller.login);
router.post('/login', adminMiddleware.checkAdmin, controller.postLogin);

router.get('/signup', adminMiddleware.checkAdmin, controller.signUp);
router.post('/signup', adminMiddleware.checkAdmin, upload.single('avatar'), validate.postSignUp, controller.postSignUp);

router.get('logout', adminMiddleware.checkAdmin, controller.logout);

module.exports = router;