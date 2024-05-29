const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/signup', userController.signupPage);
router.get('/login', userController.loginPage);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/', authMiddleware.isAuthenticated, userController.getUsers);
router.get('/:id', authMiddleware.isAuthenticated, userController.getUser);
router.post('/:id', authMiddleware.isAuthenticated, userController.updateUser);
router.post('/delete/:id', authMiddleware.isAuthenticated, userController.deleteUser);

module.exports = router;
