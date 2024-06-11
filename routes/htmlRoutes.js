const router = require('express').Router();
const { Attire } = require('../models');
const withAuth = require('../middleware/auth'); // Import the auth middleware
const { log } = require('handlebars');

// Home route - Protected
// router.get('/', withAuth, async (req, res) => {
//     try {
        // const attireData = await Attire.findAll({});
        // const attires = attireData.map((attire) => attire.get({ plain: true }));
        // console.log(attires);
        // res.render('home', { title: 'dressCode', attires });
//         res.render('login')
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/homepage-attire', withAuth, async (req, res) => {
    try {
        res.render('homepage-attire')

    } catch (err) {
        res.status(500).json(err);
    }
})

// Login route - Public
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', { title: 'Login' });
});

// Register route - Public
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Dashboard route - Protected
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const attireData = await Attire.findAll({ where: { user_id: req.session.user_id } });
        const attires = attireData.map((attire) => attire.get({ plain: true }));
        res.render('dashboard', { title: 'Dashboard', attires });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
