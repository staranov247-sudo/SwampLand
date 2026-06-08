import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';

const Admin = () => {
    // --- СИСТЕМА ВХОДА ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const SECRET_PASSWORD = "KHJGBFodjfjolUDOFGODJfIUGfu7dobf23UFGIY"; // Пароль для входа

    // --- НАВИГАЦИЯ ---
    const [activeTab, setActiveTab] = useState('seasons'); // 'seasons' или 'users'

    // --- ДАННЫЕ ДЛЯ СЕЗОНОВ ---
    const [seasons, setSeasons] = useState([]);
    const [seasonsLoading, setSeasonsLoading] = useState(false);

    // --- ДАННЫЕ ДЛЯ ИГРОКОВ ---
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    // --- ПОЛЯ ФОРМЫ СЕЗОНОВ ---
    const [title, setTitle] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Функция загрузки сезонов с сервера
    const loadSeasons = async () => {
        setSeasonsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/seasons');
            if (response.ok) {
                const data = await response.json();
                setSeasons(data);
            }
        } catch (error) {
            console.error("Не удалось загрузить сезоны:", error);
        } finally {
            setSeasonsLoading(false);
        }
    };

    // Функция загрузки игроков с сервера
    const loadUsers = async () => {
        setUsersLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: { 'X-Admin-Password': password }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                message.error('Ошибка загрузки списка игроков');
            }
        } catch (error) {
            console.error("Не удалось загрузить игроков:", error);
        } finally {
            setUsersLoading(false);
        }
    };

    // Загружаем список при авторизации или смене вкладки
    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'seasons') {
                loadSeasons();
            } else {
                loadUsers();
            }
        }
    }, [isAuthenticated, activeTab]);

    // Проверка пароля
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === SECRET_PASSWORD) {
            setIsAuthenticated(true);
            message.success('Доступ разрешен');
        } else {
            message.error('Неверный пароль!');
            setPassword('');
        }
    };

    // Отправка формы создания сезона
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            message.error('Пожалуйста, выберите картинку!');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('dateRange', dateRange);
        formData.append('duration', duration);
        formData.append('description', description);
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:5000/api/seasons', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                message.success('Сезон успешно добавлен!');
                setTitle(''); setDateRange(''); setDuration('');
                setDescription(''); setImageFile(null);
                document.getElementById('file-input').value = '';
                loadSeasons();
            } else {
                message.error('Ошибка при добавлении сезона.');
            }
        } catch (error) {
            console.error(error);
            message.error('Нет связи с сервером.');
        } finally {
            setIsLoading(false);
        }
    };

    // Функция удаления сезона
    const handleDelete = async (id, seasonTitle) => {
        if (!window.confirm(`Вы уверены, что хотите полностью удалить "${seasonTitle}"?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/seasons/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                message.success(`Сезон "${seasonTitle}" успешно удален!`);
                setSeasons(seasons.filter(season => season.id !== id));
            } else {
                message.error('Не удалось удалить сезон.');
            }
        } catch (error) {
            console.error(error);
            message.error('Ошибка при отправке запроса на удаление.');
        }
    };

    // Принудительная отвязка игрока
    const handleUnlinkUser = async (id, username, mcNick) => {
        if (!window.confirm(`Вы уверены, что хотите принудительно отвязать никнейм "${mcNick}" у пользователя ${username}?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}/unlink`, {
                method: 'POST',
                headers: { 'X-Admin-Password': password }
            });

            if (response.ok) {
                message.success(`Никнейм для ${username} успешно сброшен`);
                // Локально обновляем список на фронте
                setUsers(users.map(u => u.id === id ? { ...u, minecraftNickname: null, minecraftVerified: false } : u));
            } else {
                message.error('Не удалось отвязать никнейм');
            }
        } catch (error) {
            console.error(error);
            message.error('Ошибка связи с сервером');
        }
    };

    // Стили инпутов
    const inputStyle = {
        width: '100%', padding: '12px 15px', marginBottom: '20px',
        background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(31, 163, 198, 0.3)',
        borderRadius: '8px', color: '#fff', fontFamily: 'inherit',
        fontSize: '10px', outline: 'none', transition: 'border-color 0.3s ease'
    };

    const glassPanelStyle = {
        background: 'rgba(25, 25, 25, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    };

    // --- ЭКРАН АВТОРИЗАЦИИ ---
    if (!isAuthenticated) {
        return (
            <div style={{ padding: '100px 20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                <div className="anim-fade-in" style={{
                    background: 'rgba(25, 25, 25, 0.6)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 77, 79, 0.3)',
                    borderRadius: '12px', padding: '40px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}>
                    <h2 style={{ color: '#ff4d4f', marginBottom: '10px', fontSize: '18px' }}>Запретная зона</h2>
                    <p style={{ color: '#888', fontSize: '10px', marginBottom: '30px' }}>Введите ключ доступа</p>
                    
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            style={{...inputStyle, textAlign: 'center', fontSize: '14px', letterSpacing: '3px'}} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••"
                            required 
                        />
                        <button type="submit" style={{
                            width: '100%', padding: '15px', background: '#ff4d4f', color: '#fff',
                            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                            fontFamily: 'inherit', fontSize: '12px', transition: 'transform 0.2s ease',
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- ОСНОВНАЯ ПАНЕЛЬ (Вкладки) ---
    return (
        <div style={{ padding: '40px 20px 100px', maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Переключатель вкладок админки */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'center' }}>
                <button 
                    onClick={() => setActiveTab('seasons')}
                    style={{
                        background: activeTab === 'seasons' ? '#1FA3C6' : 'rgba(25, 25, 25, 0.6)',
                        color: activeTab === 'seasons' ? '#000' : '#e0e0e0',
                        border: `1px solid ${activeTab === 'seasons' ? '#1FA3C6' : 'rgba(255,255,255,0.05)'}`,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '10px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Управление сезонами
                </button>
                <button 
                    onClick={() => setActiveTab('users')}
                    style={{
                        background: activeTab === 'users' ? '#1FA3C6' : 'rgba(25, 25, 25, 0.6)',
                        color: activeTab === 'users' ? '#000' : '#e0e0e0',
                        border: `1px solid ${activeTab === 'users' ? '#1FA3C6' : 'rgba(255,255,255,0.05)'}`,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '10px',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Управление игроками
                </button>
            </div>

            {/* ВКЛАДКА 1: СЕЗОНЫ */}
            {activeTab === 'seasons' && (
                <div>
                    {/* Форма создания */}
                    <div className="anim-fade-in" style={{
                        ...glassPanelStyle,
                        border: '1px solid rgba(31, 163, 198, 0.5)',
                        marginBottom: '40px'
                    }}>
                        <h2 style={{ color: '#1FA3C6', textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
                            Добавить новый сезон
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <label style={{ color: '#aaa', fontSize: '9px', marginBottom: '5px', display: 'block' }}>Название</label>
                            <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} required />

                            <label style={{ color: '#aaa', fontSize: '9px', marginBottom: '5px', display: 'block' }}>Период (дат)</label>
                            <input style={inputStyle} value={dateRange} onChange={(e) => setDateRange(e.target.value)} required />

                            <label style={{ color: '#aaa', fontSize: '9px', marginBottom: '5px', display: 'block' }}>Длительность</label>
                            <input style={inputStyle} value={duration} onChange={(e) => setDuration(e.target.value)} required />

                            <label style={{ color: '#aaa', fontSize: '9px', marginBottom: '5px', display: 'block' }}>Загрузить картинку спавна</label>
                            <input id="file-input" type="file" accept="image/*" style={{...inputStyle, padding: '9px 15px'}} onChange={(e) => setImageFile(e.target.files[0])} required />

                            <label style={{ color: '#aaa', fontSize: '9px', marginBottom: '5px', display: 'block' }}>Краткое описание (лор, события)</label>
                            <textarea style={{...inputStyle, height: '100px', resize: 'none'}} value={description} onChange={(e) => setDescription(e.target.value)} required />

                            <button type="submit" disabled={isLoading} style={{
                                width: '100%', padding: '15px', background: '#1FA3C6', color: '#000',
                                border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer',
                                fontFamily: 'inherit', fontSize: '12px', transition: 'transform 0.2s ease',
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                {isLoading ? 'Загрузка...' : 'Опубликовать Сезон'}
                            </button>
                        </form>
                    </div>

                    {/* Список */}
                    <div className="anim-fade-in delay-1" style={glassPanelStyle}>
                        <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                            Управление созданными сезонами
                        </h3>

                        {seasonsLoading ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>
                        ) : seasons.length === 0 ? (
                            <div style={{ color: '#666', fontSize: '10px', textAlign: 'center', padding: '10px 0' }}>Сезонов пока не создано.</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {seasons.map(season => (
                                    <div key={season.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'rgba(0,0,0,0.3)',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.03)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img 
                                                src={season.imageUrl} 
                                                alt="" 
                                                style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #444' }} 
                                            />
                                            <div>
                                                <div style={{ color: '#1FA3C6', fontSize: '11px', fontWeight: 'bold' }}>{season.title}</div>
                                                <div style={{ color: '#666', fontSize: '8px', marginTop: '4px' }}>{season.dateRange}</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(season.id, season.title)}
                                            style={{
                                                background: 'rgba(255, 77, 79, 0.1)',
                                                color: '#ff4d4f',
                                                border: '1px solid rgba(255, 77, 79, 0.3)',
                                                padding: '8px 15px',
                                                borderRadius: '6px',
                                                fontSize: '9px',
                                                fontFamily: 'inherit',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseOver={(e) => { e.target.style.background = '#ff4d4f'; e.target.style.color = '#fff'; }}
                                            onMouseOut={(e) => { e.target.style.background = 'rgba(255, 77, 79, 0.1)'; e.target.style.color = '#ff4d4f'; }}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ВКЛАДКА 2: ИГРОКИ */}
            {activeTab === 'users' && (
                <div className="anim-fade-in" style={glassPanelStyle}>
                    <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                        Зарегистрированные пользователи и привязки
                    </h3>

                    {usersLoading ? (
                        <div style={{ textAlign: 'center', padding: '30px' }}><Spin /></div>
                    ) : users.length === 0 ? (
                        <div style={{ color: '#666', fontSize: '10px', textAlign: 'center', padding: '10px 0' }}>Игроков пока нет.</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {users.map(user => {
                                const avatarUrl = user.avatar 
                                    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
                                    : 'https://cdn.discordapp.com/embed/avatars/0.png';

                                return (
                                    <div key={user.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'rgba(0,0,0,0.3)',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.03)'
                                    }}>
                                        {/* Данные Discord */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img 
                                                src={avatarUrl} 
                                                alt="" 
                                                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #5865F2' }} 
                                            />
                                            <div>
                                                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>{user.username}</div>
                                                <div style={{ color: '#555', fontSize: '7px', marginTop: '2px' }}>DS ID: {user.discordId}</div>
                                            </div>
                                        </div>

                                        {/* Статус Minecraft */}
                                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            {user.minecraftVerified ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ color: '#ffd700', fontSize: '10px', fontWeight: 'bold' }}>
                                                            {user.minecraftNickname}
                                                        </div>
                                                        <div style={{ color: '#20c997', fontSize: '7px', marginTop: '2px' }}>
                                                            Привязан ✅
                                                        </div>
                                                    </div>
                                                    <img 
                                                        src={`https://minotar.net/helm/${user.minecraftNickname}/24.png`} 
                                                        alt="" 
                                                        style={{ width: '24px', height: '24px', imageRendering: 'pixelated', borderRadius: '4px' }}
                                                        onError={(e) => e.target.src = 'https://minotar.net/helm/Char/24.png'}
                                                    />
                                                </div>
                                            ) : (
                                                <div style={{ color: '#ff4d4f', fontSize: '9px' }}>Не привязан ❌</div>
                                            )}

                                            {/* Действия */}
                                            {user.minecraftVerified && (
                                                <button
                                                    onClick={() => handleUnlinkUser(user.id, user.username, user.minecraftNickname)}
                                                    style={{
                                                        background: 'rgba(255, 77, 79, 0.1)',
                                                        color: '#ff4d4f',
                                                        border: '1px solid rgba(255, 77, 79, 0.3)',
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        fontSize: '8px',
                                                        fontFamily: 'inherit',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => { e.target.style.background = '#ff4d4f'; e.target.style.color = '#fff'; }}
                                                    onMouseOut={(e) => { e.target.style.background = 'rgba(255, 77, 79, 0.1)'; e.target.style.color = '#ff4d4f'; }}
                                                >
                                                    Отвязать ник
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Admin;