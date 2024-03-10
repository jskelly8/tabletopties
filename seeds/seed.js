// Required packages and files
const sequelize = require('../config/connection');
const { User, Game, Event, Message } = require('../models');
const userData = require('./userData.json');
const gameData = require('./gameData.json');
const eventData = require('./eventData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");

        // Seed users
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        // Seed games
        const games = await Game.bulkCreate(gameData);

        // Seed events
        for (const event of eventData) {
            await Event.create({
                ...event,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                game_id: games[Math.floor(Math.random() * games.length)].id,
            });
        }

        console.log('Database seeded successfully.');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await sequelize.close();
        console.log('Sequelize connection closed.');
    }
};

seedDatabase();