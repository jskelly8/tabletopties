// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Message'
});

// Export
module.exports = Message;