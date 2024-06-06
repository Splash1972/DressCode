const router = require('express').Router();

const userRoutes = require('./userRoutes');

const attireRoutes = require('./attireRoutes');

router.use('/users', userRoutes);
router.use('/attires', attireRoutes);

module.exports = router;
