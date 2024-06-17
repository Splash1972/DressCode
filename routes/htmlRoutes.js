const router = require('express').Router();
const { Attire } = require('../models');
const withAuth = require('../middleware/auth'); // Import the auth middleware
const { log } = require('handlebars');


router.get('/homepage-attire', withAuth, async (req, res) => {
    try {
        console.log(req.session)
        res.render('homepage-attire', {loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err);
    }
})

// Login route - Public
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('login', { title: 'Login',loggedIn: req.session.loggedIn });
});

// Register route - Public
// router.get('/register', (req, res) => {
//     res.render('register', { title: 'Register' });
// });

// Dashboard route - Protected
// router.get('/login', withAuth, async (req, res) => {
//     try {
//         const attireData = await Attire.findAll({ where: { user_id: req.session.user_id } });
//         const attires = attireData.map((attire) => attire.get({ plain: true }));
//         res.render('login', { title: 'login', attires });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
