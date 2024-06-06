const router = require('express').Router();
const userController = require('../../controllers/userController');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.registerUser);

module.exports = router;
