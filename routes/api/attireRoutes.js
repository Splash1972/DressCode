// routes/api/attireRoutes.js
const router = require('express').Router();
const attireController = require('../../controllers/attireController');

router.get('/', attireController.getAllAttires);
router.post('/', attireController.createAttire);

module.exports = router;
