const { Sequelize } = require('sequelize');

// Настраиваем подключение к локальной базе данных SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Этот файл автоматически создастся в папке backend
    logging: false // Отключаем спам из SQL-запросов в консоли
});

module.exports = sequelize;
