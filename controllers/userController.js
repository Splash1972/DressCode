const { User } = require('../models');

module.exports = {
    // register function
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            console.log(firstName, lastName);
    
            if (!firstName || !lastName || !email || !password) {
                res.status(400).render('register', { message: 'Please fill in all fields' });
                return;
            }
    
            const userData = await User.findOne({ where: { email } });
            console.log(userData);
    
            if (userData) {
                res.status(400).render('register', { message: 'Email already in use' });
                return;
            }
    
            const newUser = await User.create({ firstName, lastName, email, password });
            console.log(newUser);
    
            if (!newUser) {
                res.status(400).render('register', { message: 'Error creating user' });
                return;
            }
    
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
    
                res.render('login');
            });
        } catch (err) {
            console.log(err);
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
    
                res.redirect('/');  // https://localhost:3001/
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    logout: (req, res) => {
        
        if (req.session) {
            // err => {
            //     if (err) {
            //         res.status(400).send('Unable to log out');
            //     } else {
            //         // res.send('Logout successful');
            //         res.render('/login')
            //     }
            // }
            req.session.destroy();
            res.render('/login')
        } else {
            res.end();
        }
    },
};