const express = require('express');
const multer = require('multer');
const validate = require('../validation/auth');

const controller = require('../controllers/auth');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/login', controller.login);

router.get('/signup', controller.signUp);
router.post('/signup', upload.single('avatar'), validate.postSignUp, controller.postSignUp);

module.exports = router;