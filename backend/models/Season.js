const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Season = sequelize.define('Season', {
    title: { type: DataTypes.STRING, allowNull: false },
    dateRange: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false } // Ссылка на картинку
});

module.exports = Season;