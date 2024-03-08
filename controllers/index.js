// Imports
const router = require('express').Router();
const apiRoute = require('./api');
const homeRoute = require('./homeRoutes');
const chatRoute = require('./chatRoutes');

// Routing
router.use('/api', apiRoute);
router.use('/', homeRoute);
router.use('/', chatRoute);

// Export
module.exports = router;