const router = require('express').Router();
const { Attire } = require('../models');
const withAuth = require('../middleware/auth'); // Import the auth middleware

// Home route - Protected
router.get('/', withAuth, async (req, res) => {
    try {
        const attireData = await Attire.findAll({});
        const attires = attireData.map((attire) => attire.get({ plain: true }));
        res.render('home', { title: 'dressCode', attires });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route - Public
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', { title: 'Login' });
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
