const router = require('express').Router();
const { register, login, logout } = require('../../controllers/userController');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ message: 'Logged in successfully' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Logout route
router.post('/logout', logout);

module.exports = router;
