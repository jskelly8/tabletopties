// Imports
const router = require('express').Router();
const { User, Game } = require('../../models');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        res.status(200).json(userData);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json(error);
    }
});

// GET route to fetch a specific user by ID
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        });

        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error(error); 
        res.status(500).json(error);
    }
});

// POST route to update when user is created
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST route to edit profile
router.post('/profile/edit', withAuth, async (req, res) => {
    try {
        const { name, email, location } = req.body;
        const updatedUserData = await User.update(
            { name, email, location },
            { where: { id: req.session.user_id } }
        );
        if (!updatedUserData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST route for user registration
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

// POST route for handling login requests
router.post ('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email:req.body.email}});
        if (!userData) {
            res.status(400).json({message: 'Incorrect user email or password. Please try again '});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect user email or password. Please try again'});
            return; 
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Login success!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST route to handle logout requests
router.post('/logout', (req,res) => {
    if (req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// GET route to search for users by username
router.get('/username/:username', async (req, res) => {
    try {
        console.log(req.params.username);
        const userData = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${req.params.username}`
                }
            }
        });

        if (userData.length) {
            return res.status(200).json(userData);
        } else {
            return res.status(404).json({ message: 'No user found under that username' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Export
module.exports = router;