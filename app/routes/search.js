const express = require('express');
const router = express.Router();
const controller = require('../controllers/search');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.get('/', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.index);
router.get('/items', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.search);
module.exports = router;