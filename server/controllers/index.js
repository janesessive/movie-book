const express = require('express');
const router = express.Router();
const actorsRoutes = require('../controllers/actors');
const genresRoutes = require('../controllers/genres');

// router.use('/api/users', require('../controllers/users'));
router.use('/api/genres', genresRoutes);
router.use('/api/actors', actorsRoutes );

module.exports = router;
