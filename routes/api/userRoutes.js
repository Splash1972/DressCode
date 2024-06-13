const router = require('express').Router();
const { register, login, logout } = require('../../controllers/userController');
const { User } = require('../../models');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;

      // res.status(200).json({ message: 'Logged in successfully' });
      // res.render('homepage-attire');
      res.render('homepage-attire', {
        loggedIn: req.session.loggedIn
      }) 
    });
    console.log(req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Logout route
router.post('/logout', logout);

module.exports = router;
