const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: true }, // Может быть пустым для гостей
    itemName: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    target: { type: DataTypes.STRING, allowNull: false }, // "Градиент" или "Префикс (Тег)"
    status: { type: DataTypes.STRING, defaultValue: 'COMPLETED' }, // 'PENDING' или 'COMPLETED'
    minecraftNickname: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Purchase;
