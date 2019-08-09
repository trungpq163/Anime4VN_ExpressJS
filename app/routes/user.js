const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.get('/:id', authMiddleware.requireAuth, controller.home);

module.exports = router;