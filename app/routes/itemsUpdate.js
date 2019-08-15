const express = require('express');
const multer = require('multer');
const controller = require('../controllers/itemsUpdate');
const validate = require('../validation/itemUpdate');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/create', controller.createItems);
router.post('/create', upload.single('image'), controller.postCreateItems);

module.exports = router;