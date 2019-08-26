const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.get('/', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.index);
router.get('/anime/:url/', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.info);
router.get('/anime/:url/:ep', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.playvideo);
router.get('/genre/:genre', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.genre);
router.get('/season/:season', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.season);
router.get('/year/:year', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.year);
router.get('/favorite/anime/:id', authMiddleware.requireAuth, adminMiddleware.checkAdmin, authMiddleware.checkAuth, controller.favorite);
router.get('/favorite/user/:id', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.userFavorite);
router.get('/delete/favorite/anime/:id', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.getDeleteFavorite);
router.get('/view/count/:id/:ep', authMiddleware.checkAuth, adminMiddleware.checkAdmin, controller.viewCount);
module.exports = router;