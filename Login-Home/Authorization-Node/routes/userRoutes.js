const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const homeController = require('../controllers/homeController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', userController.login);

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', userController.signup);
router.get('/home', authenticateToken, homeController.renderHomePage);


router.get('/logout', authenticateToken, userController.logout);

module.exports = router;
