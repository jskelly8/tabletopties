// Imports
const router = require('express').Router();
const withAuth = require('../utils/auth');

// GET route to display the chat interface
router.get('/chat', withAuth, (req, res) => {
    try {
        res.render('chat', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error('Failed to render chat interface:', err);
        res.status(500).json(err);
    }
});

// Export
module.exports = router;