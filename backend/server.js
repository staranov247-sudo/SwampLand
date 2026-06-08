require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Для запросов к DonatePay
const multer = require('multer'); // Для загрузки файлов
const path = require('path');
const fs = require('fs'); // Для работы с файловой системой

const sequelize = require('./config/db');
const Season = require('./models/Season');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// --- СОЗДАЕМ ПАПКУ ДЛЯ КАРТИНОК ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Если папки uploads нет, сервер создаст её сам
}

// --- НАСТРОЙКА MULTER (Где и как сохранять файлы) ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Сохраняем в папку uploads
    },
    filename: function (req, file, cb) {
        // Даем картинке уникальное имя (дата + оригинальное расширение)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// ДЕЛАЕМ ПАПКУ UPLOADS ПУБЛИЧНОЙ (чтобы React мог по ссылке брать картинки)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- МАРШРУТЫ ДЛЯ СЕЗОНОВ ---

app.get('/api/seasons', async (req, res) => {
    try {
        const seasons = await Season.findAll({ order: [['id', 'DESC']] });
        res.json(seasons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка загрузки сезонов' });
    }
});

// ИЗМЕНЕНИЯ ЗДЕСЬ: Добавили upload.single('image')
app.post('/api/seasons', upload.single('image'), async (req, res) => {
    try {
        // Текстовые данные лежат в req.body
        const { title, dateRange, duration, description } = req.body;
        
        // Ссылка на сохраненный файл
        // Сохраняем полный URL: http://localhost:5000/uploads/имя_файла.png
        const imageUrl = req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : '';

        const newSeason = await Season.create({
            title, dateRange, duration, description, imageUrl
        });
        
        res.status(201).json(newSeason);
    } catch (error) {
        console.error('Ошибка при создании сезона:', error);
        res.status(500).json({ message: 'Не удалось сохранить сезон', error: error.message });
    }
});

// 3. Удалить сезон (и его картинку с диска)
app.delete('/api/seasons/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Ищем сезон в базе данных
        const season = await Season.findByPk(id);
        if (!season) {
            return res.status(404).json({ message: 'Сезон не найден' });
        }

        // Удаляем файл картинки из папки uploads, если он существует
        if (season.imageUrl) {
            // Извлекаем имя файла из ссылки (http://localhost:5000/uploads/имя_файла.png -> имя_файла.png)
            const filename = season.imageUrl.split('/uploads/')[1];
            if (filename) {
                const filePath = path.join(__dirname, 'uploads', filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Удаляем файл с жесткого диска
                    console.log(`🗑️ Файл картинки ${filename} успешно удален с диска.`);
                }
            }
        }

        // Удаляем запись из базы данных
        await season.destroy();
        
        res.json({ message: 'Сезон успешно удален из базы данных' });
    } catch (error) {
        console.error('Ошибка при удалении сезона:', error);
        res.status(500).json({ message: 'Не удалось удалить сезон', error: error.message });
    }
});

// Маршрут для создания платежа DonatePay
app.post('/api/payment/create', async (req, res) => {
    // Получаем данные от React
    const { itemName, price, nickname, target } = req.body;
    
    // Убираем символ " ₽" из цены и переводим в чистое число
    const numericPrice = parseInt(price.toString().replace(/\D/g, ''), 10);

    try {
        // Отправляем запрос на сервера DonatePay
        const response = await axios.post('https://donatepay.ru/api/v1/transactions', {
            access_token: process.env.DONATEPAY_API_KEY, // Твой секретный ключ из .env
            sum: numericPrice,
            type: 'custom', 
            comment: `Оплата: ${itemName} для игрока ${nickname} (цель: ${target})`
        });

        if (response.data && response.data.status === 'success') {
             res.json({ success: true, paymentUrl: response.data.data.url });
        } else {
             console.error('Ответ DonatePay:', response.data);
             res.status(400).json({ success: false, message: 'Ошибка создания платежа' });
        }
    } catch (error) {
        console.error('Ошибка при обращении к DonatePay:', error.message);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});


// --- ЗАПУСК БАЗЫ ДАННЫХ И СЕРВЕРА ---
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Подключение к базе данных успешно установлено.');
        await sequelize.sync({ alter: true }); 
        console.log('✅ Таблицы базы данных синхронизированы.');
        
        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Ошибка при запуске сервера или БД:', error);
    }
};

startServer();