// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model { }

Message.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Message',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
);

// Export
module.exports = Message;