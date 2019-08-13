const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.get('/:id', authMiddleware.requireAuth, controller.home);
router.get('/', authMiddleware.requireAuth, controller.index);

module.exports = router;