const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VerificationCode = sequelize.define('VerificationCode', {
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    minecraftNickname: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false }
});

module.exports = VerificationCode;
