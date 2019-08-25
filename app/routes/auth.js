const express = require('express');
const multer = require('multer');
const validate = require('../validation/auth');
const controller = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/login', authMiddleware.checkAuth, controller.login);
router.post('/login', controller.postLogin);

router.get('/signup', authMiddleware.checkAuth, controller.signUp);
router.post('/signup', upload.single('avatar'), validate.postSignUp, controller.postSignUp);

router.get('/change', authMiddleware.checkAuth, controller.changePass);
router.put('/change', authMiddleware.checkAuth, controller.putChangePass);

router.get('/forgot', authMiddleware.checkAuth, controller.forgotPass);
router.put('/forgot', authMiddleware.checkAuth, controller.putForgotPass);

router.get('/logout', authMiddleware.checkAuth, controller.logout);

module.exports = router;