const express = require('express');
const multer = require('multer');
const controller = require('../controllers/items');
const validate = require('../validation/items');

const router = express.Router();

let upload = multer({
    dest: './public/uploads/'
});

router.get('/create', controller.createItems);
//router.post('/create', upload.single('backGround'), validate.postCreateItems, controller.postCreateItems);
router.post('/create', upload.fields([{
    name: 'backGround',
    maxCount: 1
}, {
    name: 'image',
    maxCount: 1
}]), validate.postCreateItems, controller.postCreateItems);

module.exports = router;