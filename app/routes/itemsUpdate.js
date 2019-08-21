const express = require('express');
const multer = require('multer');
const controller = require('../controllers/itemsUpdate');
const validate = require('../validation/itemUpdate');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/create', adminMiddleware.validate, controller.createItems);
router.post('/create', upload.single('image'), validate.postCreateItems, controller.postCreateItems);

module.exports = router;