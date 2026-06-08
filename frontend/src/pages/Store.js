import React, { useState, useEffect } from 'react';
import { Typography, Input, message } from 'antd';

const { Title } = Typography;

const Store = ({ user }) => {
    // Состояния для примерочной
    const [nickname, setNickname] = useState(() => {
        return user?.minecraftNickname || 'Steve';
    });

    // Синхронизируем никнейм при входе/выходе или изменении привязки
    useEffect(() => {
        if (user?.minecraftNickname) {
            setNickname(user.minecraftNickname);
        } else {
            setNickname('Steve');
        }
    }, [user]);
    
    // Отдельно для НИКА
    const [nickColor, setNickColor] = useState('#fff'); 
    const [nickGradient, setNickGradient] = useState(null); 
    
    // Отдельно для ТЕГА (и иконки)
    const [tagColor, setTagColor] = useState('#fff'); 
    const [tagGradient, setTagGradient] = useState(null); 

    const [previewTag, setPreviewTag] = useState(''); 
    const [previewIcon, setPreviewIcon] = useState(null); 
    
    
    // ДОБАВЛЯЕМ ЭТО: Состояние для текущей категории товаров
    const [activeTab, setActiveTab] = useState('Все');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // --- ПРЯЧЕМ СТАТИЧЕСКОГО ПЕРСОНАЖА: Добавляем класс-метку ---
        document.body.classList.add('page-store');

        // --- ВОЗВРАЩАЕМ ПЕРСОНАЖА: Убираем метку при уходе со страницы ---
        return () => {
            document.body.classList.remove('page-store');
        };
    }, []);

    // База данных наших товаров (пока тестовая)
    const storeItems = [
        {
            id: 1,
            category: 'Градиент',
            name: 'Океан',
            description: 'Плавный переход от голубого к синему.',
            gradient: 'linear-gradient(90deg, #00c6ff, #0072ff)',
            price: '15 ₽'
        },
        {
            id: 4,
            category: 'Градиент',
            name: 'Магма',
            description: 'Плавный переход от желтого к красному.',
            gradient: 'linear-gradient(90deg, #ffff55, #ff5555)',
            price: '15 ₽'
        },
        {
            id: 5,
            category: 'Градиент',
            name: 'Электрический Индиго',
            description: 'Переход от индиго к глубокому фиолетовому.',
            gradient: 'linear-gradient(90deg, #667eea, #764ba2)',
            price: '15 ₽'
        },
        {
            id: 6,
            category: 'Градиент',
            name: 'Морозная Мята',
            description: 'Переход от мятного к морозному синему.',
            gradient: 'linear-gradient(90deg, #2af598, #009efd)',
            price: '15 ₽'
        },
        {
            id: 7,
            category: 'Градиент',
            name: 'Королевский Аметист',
            description: 'Яркий переход от аметистового к голубому.',
            gradient: 'linear-gradient(90deg, #b721ff, #21d4fd)',
            price: '15 ₽'
        },
        {
            id: 9,
            category: 'Градиент',
            name: 'Кибер-розовый',
            description: 'Неоновый переход от розового к оранжевому.',
            gradient: 'linear-gradient(90deg, #ee0979, #ff6a00)',
            price: '15 ₽'
        },
        {
            id: 10,
            category: 'Градиент',
            name: 'Солнечная Вспышка',
            description: 'Огненный переход от красного к желтому.',
            gradient: 'linear-gradient(90deg, #f83600, #f9d423)',
            price: '15 ₽'
        },
        {
            id: 11,
            category: 'Градиент',
            name: 'Кислотный Леденец',
            description: 'Яркий салатово-зеленый переход.',
            gradient: 'linear-gradient(90deg, #d4fc79, #96e6a1)',
            price: '15 ₽'
        },
        {
            id: 12,
            category: 'Градиент',
            name: 'Лавовая Лампа',
            description: 'Переход от светло-фиолетового к коралловому.',
            gradient: 'linear-gradient(90deg, #f093fb, #f5576c)',
            price: '15 ₽'
        },
        {
            id: 13,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Trident.png',
            price: '20 ₽'
        },
        {
            id: 14,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Picaxe.png',
            price: '20 ₽'
        },
        {
            id: 15,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Shield.png',
            price: '20 ₽'
        },
        {
            id: 16,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Bow.png',
            price: '20 ₽'
        },
        {
            id: 17,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Botle.png',
            price: '20 ₽'
        },
        {
            id: 18,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Heart.png',
            price: '20 ₽'
        },
        {
            id: 19,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Star.png',
            price: '20 ₽'
        },
        {
            id: 20,
            category: 'Префикс (Тег)',
            name: 'Тег ',
            description: 'Покажи всем свой статус. Идет перед ником.',
            tag: '',
            tagColor: '#ff55ff',
            icon: '/Lighting.png',
            price: '20 ₽'
        },
        
    ];

    const filteredItems = storeItems.filter(item => {
        if (activeTab === 'Все') return true;
        if (activeTab === 'Градиенты' && item.category === 'Градиент') return true;
        if (activeTab === 'Теги' && item.category === 'Префикс (Тег)') return true;
        return false;
    });

    // Функция примерки товара
    const handleTryOn = (item, target = 'nick') => {
        if (item.category === 'Префикс (Тег)') {
            setPreviewTag(item.tag);
            setPreviewIcon(item.icon || null);
            message.success(`Тег ${item.tag} применен!`);
        } else if (item.category === 'Градиент') {
            if (target === 'tag') {
                setTagGradient(item.gradient);
                setTagColor(null);
                message.success(`Градиент "${item.name}" применен на тег!`);
            } else {
                setNickGradient(item.gradient);
                setNickColor(null);
                message.success(`Градиент "${item.name}" применен на ник!`);
            }
        } else {
            if (target === 'tag') {
                setTagColor(item.color);
                setTagGradient(null);
                message.success(`Цвет "${item.name}" применен на тег!`);
            } else {
                setNickColor(item.color);
                setNickGradient(null);
                message.success(`Цвет "${item.name}" применен на ник!`);
            }
        }
    };

    // Функция покупки товара
    const handleBuy = async (item) => {
        // Проверяем, ввел ли игрок свой реальный ник (чтобы не купить донат на Стива)
        if (!nickname || nickname.trim() === '' || nickname === 'Steve') {
            message.warning('Пожалуйста, введите ваш никнейм в примерочной перед покупкой!');
            return;
        }

        const hideLoading = message.loading('Создание платежа...', 0);

        try {
            // Отправляем запрос на наш бэкенд
            const response = await fetch('http://localhost:5000/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: item.name,
                    price: item.price,
                    nickname: nickname,
                    target: item.category // Передаем категорию (Цвет, Градиент, Тег)
                })
            });

            const data = await response.json();
            hideLoading();

            if (data.success && data.paymentUrl) {
                // Если всё ок — перенаправляем игрока на страницу оплаты DonatePay
                window.location.href = data.paymentUrl;
            } else {
                message.error(data.message || 'Произошла ошибка при создании платежа');
            }
        } catch (error) {
            hideLoading();
            console.error('Ошибка покупки:', error);
            message.error('Ошибка соединения с сервером');
        }
    };

    // Стили для стеклянных панелей
    const glassPanelStyle = {
        background: 'rgba(25, 25, 25, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    };

    const getIconStyle = (iconUrl, color, gradient) => ({
        width: '24px', 
        height: '24px',
        WebkitMaskImage: `url(${iconUrl})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(${iconUrl})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        background: gradient || color || '#fff', // Красит картинку в цвет/градиент
        imageRendering: 'pixelated',
        filter: gradient ? 'none' : 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))'
    });

    // Генерируем стиль текста для парящего ника (учитывая градиенты)
    const getNicknameStyle = () => {
        let baseStyle = {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '18px',
            textShadow: nickGradient ? 'none' : '2px 2px 0px rgba(0,0,0,0.8)',
            color: nickColor || '#fff',
        };
        if (nickGradient) {
            baseStyle.backgroundImage = nickGradient;
            baseStyle.WebkitBackgroundClip = 'text';
            baseStyle.backgroundClip = 'text';
            baseStyle.WebkitTextFillColor = 'transparent';
            baseStyle.color = 'transparent';
        }
        return baseStyle;
    };

    // Стиль для ТЕГА
    const getTagStyle = () => {
        let baseStyle = {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '18px',
            textShadow: tagGradient ? 'none' : '2px 2px 0px rgba(0,0,0,0.8)',
            color: tagColor || '#fff',
        };
        if (tagGradient) {
            baseStyle.backgroundImage = tagGradient;
            baseStyle.WebkitBackgroundClip = 'text';
            baseStyle.backgroundClip = 'text';
            baseStyle.WebkitTextFillColor = 'transparent';
            baseStyle.color = 'transparent';
        }
        return baseStyle;
    };

    return (
        <div style={{ padding: '40px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="anim-fade-in anim-float" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Title style={{ fontSize: '32px', color: '#fff' }}>Магазин</Title>
                <div style={{ fontSize: '10px', color: '#888' }}>Поддержи сервер и выдели свой ник</div>
            </div>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                
                {/* --- ЛЕВАЯ КОЛОНКА: ПРИМЕРОЧНАЯ (Sticky) --- */}
                <div className="anim-fade-in delay-1" style={{ 
                    ...glassPanelStyle, 
                    flex: '1', 
                    minWidth: '300px', 
                    position: 'sticky', 
                    top: '100px' // Прилипает при прокрутке
                }}>
                    <h3 style={{ color: '#20c997', fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>Примерочная</h3>
                    
                    <Input 
                        placeholder="Введите ваш ник" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)}
                        readOnly={!!user?.minecraftVerified}
                        style={{ 
                            background: 'rgba(0,0,0,0.5)', border: '1px solid #444', 
                            color: '#fff', fontFamily: 'inherit', marginBottom: '15px', padding: '10px',
                            cursor: user?.minecraftVerified ? 'not-allowed' : 'text'
                        }}
                    />

                    {user?.minecraftVerified ? (
                        <div style={{ color: '#20c997', fontSize: '8px', textAlign: 'center', marginBottom: '25px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Никнейм привязан к профилю ✅
                        </div>
                    ) : (
                        <div style={{ color: '#888', fontSize: '8px', textAlign: 'center', marginBottom: '25px' }}>
                            Войдите и подтвердите ник в профиле 🔒
                        </div>
                    )}

                    {/* Рендер персонажа и ника */}
                    <div style={{ position: 'relative', textAlign: 'center', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                        
                    <div style={{
                            background: 'rgba(0, 0, 0, 0.4)', padding: '8px 16px',
                            borderRadius: '4px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.1)',
                            zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            {/* Иконка (красится цветом тега) */}
                            {previewIcon && (
                                <div style={getIconStyle(previewIcon, tagColor, tagGradient)} />
                            )}
                            
                            {/* ТЕГ */}
                            <span style={getTagStyle()}>
                                {previewTag}
                            </span>
                            
                            {/* НИК */}
                            <span style={getNicknameStyle()}>
                                {nickname || 'Steve'}
                            </span>
                        </div>

                        {/* 3D Рендер скина (Используем API mc-heads) */}
                        <img 
                            src={`https://mc-heads.net/body/${nickname || 'Steve'}/right`} 
                            alt="Skin Preview" 
                            style={{ height: '300px', imageRendering: 'pixelated', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
                            onError={(e) => { e.target.src = 'https://mc-heads.net/body/Steve/right'; }} // Резервный скин, если ник не найден
                        />
                    </div>
                </div>


                {/* --- ПРАВАЯ КОЛОНКА: СПИСОК ТОВАРОВ --- */}
                <div className="anim-fade-in delay-2" style={{ flex: '2', minWidth: '400px', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* НАВИГАЦИЯ: Вкладки категорий */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        {['Все', 'Градиенты', 'Теги'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    background: activeTab === tab ? '#20c997' : 'rgba(25, 25, 25, 0.6)',
                                    color: activeTab === tab ? '#000' : '#e0e0e0',
                                    border: `1px solid ${activeTab === tab ? '#20c997' : '#2b4a4c'}`,
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    fontSize: '10px',
                                    fontWeight: activeTab === tab ? 'bold' : 'normal',
                                    transition: 'all 0.3s ease',
                                    boxShadow: activeTab === tab ? '0 0 10px #20c997' : 'none',
                                    outline: 'none'
                                }}
                                onMouseOver={(e) => { e.target.style.borderColor = '#20c997'; }}
                                onMouseOut={(e) => { e.target.style.borderColor = '#2b4a4c'; }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* СПИСОК ТОВАРОВ (теперь рендерим отфильтрованный список) */}
                    {/* СПИСОК ТОВАРОВ (теперь рендерим отфильтрованный список) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredItems.map((item) => (
                        <div key={item.id} style={{
                            ...glassPanelStyle,
                            padding: '20px 30px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'border-color 0.3s ease',
                            borderLeft: `4px solid ${item.color || '#20c997'}`
                            }}
                            onMouseOver={(e) => { 
                                e.currentTarget.style.borderColor = '#20c997'; 
                                e.currentTarget.style.borderLeftColor = item.color || '#20c997 '; 
                            }}
                            onMouseOut={(e) => { 
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; 
                                e.currentTarget.style.borderLeftColor = item.color || '#20c997 '; 
                            }}
                            >
                                {/* ... содержимое карточки товара оставляем как было ... */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '10px', color: '#888', marginBottom: '8px' }}>{item.category}</div>
                                    <div style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {/* Если у товара есть иконка — показываем её рядом с названием */}
                                        {item.icon && (
                                            <div style={getIconStyle(item.icon, item.color, item.gradient)} />
                                        )}
                                        
                                        <span style={item.gradient ? { 
                                            backgroundImage: item.gradient, 
                                            WebkitBackgroundClip: 'text', 
                                            backgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent'
                                        } : { color: item.color }}>
                                            {item.name}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: '#b3b3b3', lineHeight: '1.5' }}>{item.description}</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                                    <div style={{ fontSize: '18px', color: '#1FA3C6', fontWeight: 'bold' }}>{item.price}</div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {/* Если это ТЕГ - показываем одну кнопку */}
                                        {item.category === 'Префикс (Тег)' ? (
                                            <button onClick={() => handleTryOn(item)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 15px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                Примерить
                                            </button>
                                        ) : (
                                            /* Если это ЦВЕТ ИЛИ ГРАДИЕНТ - показываем две кнопки */
                                            <>
                                                <button onClick={() => handleTryOn(item, 'nick')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer', fontFamily: 'inherit' }}>
                                                    Примерить
                                                </button>
                                            </>
                                        )}
                                        
                                        <button 
                                            onClick={() => handleBuy(item)} 
                                            style={{ 
                                                background: '#20c997', 
                                                color: '#fff', 
                                                border: 'none', 
                                                padding: '8px 20px', 
                                                borderRadius: '6px', 
                                                fontSize: '9px', 
                                                fontWeight: 'bold', 
                                                cursor: 'pointer', 
                                                fontFamily: 'inherit',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 0 10px rgba(16, 94, 87, 0.3)'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#10886e'}
                                            onMouseOut={(e) => e.currentTarget.style.background = '#20c997'}
                                        >
                                            Купить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;