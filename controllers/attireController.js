const { Attire } = require('../models');

module.exports = {
    getAllAttires: async (req, res) => {
        try {
            const attireData = await Attire.findAll();
            res.json(attireData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createAttire: async (req, res) => {
        try {
            const newAttire = await Attire.create({
                weather: req.body.weather,
                event: req.body.event,
                suggestion: req.body.suggestion,
                user_id: req.session.user_id,
            });
            res.json(newAttire);
        } catch (err) {
            res.status(400).json(err);
        }
    },
};
