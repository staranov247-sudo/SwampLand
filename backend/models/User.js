const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discordId: { type: DataTypes.STRING, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    minecraftNickname: { type: DataTypes.STRING, allowNull: true },
    minecraftVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = User;
