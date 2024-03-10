// Imports
const router = require('express').Router();
const withAuth = require('../utils/auth');
const Message = require('../models/Message');

// GET route to display the chat interface
router.get('/chat', withAuth, async (req, res) => {
    try {
        const messages = await Message.findAll();
        console.log(messages)
        res.render('chat', {
            logged_in: req.session.logged_in,
            messages: messages
        });
    } catch (err) {
        console.error('Failed to render chat interface:', err);
        res.status(500).json(err);
    }
});

// Export
module.exports = router;