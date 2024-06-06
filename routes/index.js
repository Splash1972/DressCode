const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');

// Sample function to get attire suggestions
const getAttireSuggestions = () => {
    return [
        { weather: 'Sunny', event: 'Casual', suggestion: 'T-shirt and shorts' },
        { weather: 'Rainy', event: 'Formal', suggestion: 'Suit with a raincoat' },
        { weather: 'Cold', event: 'Sport', suggestion: 'Sweatshirt and joggers' },
    ];
};

// Define the root route
// router.get('/', (req, res) => {
//     const attires = getAttireSuggestions();
//     res.render('home', { title: 'dressCode', attires });
// });

// Use API and HTML routes
router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

// Handle 404
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
