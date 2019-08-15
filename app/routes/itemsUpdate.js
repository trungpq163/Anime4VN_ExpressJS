const express = require('express');
const router = express.Router();
const controller = require('../controllers/item');

router.get('/create', controller.createItems);
router.post('/create', controller.postCreateItems)

module.exports = router;