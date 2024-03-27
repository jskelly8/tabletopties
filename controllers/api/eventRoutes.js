// Imports
const router = require('express').Router();
const { Event, Game, User, UsersEvents, EventsGames } = require('../../models');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET route to list all events 
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({});
        res.status(200).json(eventData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET route to fetch a specific event by ID
router.get('/:id', async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: Game,
                    through: EventsGames,
                    as: 'event_games',
                },
                {
                    model: User,
                    through: UsersEvents,
                    as: 'attending',
                    attributes: ['name'],
                },
            ]
        });

        if (!eventData) {
            res.status(404).json({ message: 'No event found with that ID.' });
            return;
        }

        res.status(200).json(eventData);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json(error);
    }
});

// POST route to create a new event
router.post('/', withAuth, async (req, res) => {
    try {
        const newEvent = await Event.create({
            ...req.body,
            user_id: req.session.user_id 
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Failed to create event:', error);
        res.status(500).json({ message: 'Failed to create event', error: error.toString() });
    }
});

// POST route for user to state interest/attendance in event
router.post('/add', withAuth, async (req, res) => {
    try {
        const eventAttend = await UsersEvents.create({
            ...req.body,
            user_id: req.session.user_id
        });
        console.log(eventAttend);
        res.status(200).json(eventAttend);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET route to search by event title
router.get('/title/:title', async (req, res) => {
    try {
        console.log(req.params.title);
        const eventData = await Event.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.title}`
                }
            }
        });

        if (eventData.length) {
            return res.status(200).json(eventData);
        } else {
            return res.status(404).json({ message: 'nope' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Export
module.exports = router;