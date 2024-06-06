const router = require('express').Router();
const { register, login, logout } = require('../../controllers/userController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

module.exports = router;
