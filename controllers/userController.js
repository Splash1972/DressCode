const { User } = require('../models');

module.exports = {
    // register function
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
    
            if (!username || !email || !password) {
                res.status(400).render('register', { message: 'Please fill in all fields' });
                return;
            }
    
            const userData = await User.findOne({ where: { email } });
    
            if (userData) {
                res.status(400).render('register', { message: 'Email already in use' });
                return;
            }
    
            const newUser = await User.create({ username, email, password });
    
            if (!newUser) {
                res.status(400).render('register', { message: 'Error creating user' });
                return;
            }
    
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
    
                res.redirect('/');
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                res.status(400).render('login', { message: 'Please fill in all fields' });
                return;
            }
    
            const userData = await User.findOne({ where: { email } });
    
            if (!userData) {
                res.redirect('/register'); // Redirect to registration page if user doesn't exist
                return;
            }
    
            const validPassword = await userData.checkPassword(password);
    
            if (!validPassword) {
                res.status(400).render('login', { message: 'Incorrect password!' });
                return;
            }
    
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
    
                res.redirect('/');
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    logout: (req, res) => {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.status(400).send('Unable to log out');
                } else {
                    res.send('Logout successful');
                }
            });
        } else {
            res.end();
        }
    },
};