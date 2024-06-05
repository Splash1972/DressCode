const { User } = require('../models');

module.exports = {
    login: async (req, res) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });

            if (!userData) {
                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    logout: (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },
    registerUser: async (req, res) => {
        try {
          const { username, email, password } = req.body;
    
          // Validate input
          if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
          }
    
          // Check if user already exists
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
    
          // Create new user
          const newUser = await User.create({
            username,
            email,
            password, // The password will be hashed by the hook defined in the model
          });
    
          // Send success response
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },
    };

