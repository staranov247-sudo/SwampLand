import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Rules from './pages/Rules';
import Seasons from './pages/Seasons';
import Store from './pages/Store';
import Commands from './pages/Commands';
import Profile from './pages/Profile';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    // При загрузке проверяем сохраненного пользователя и проверяем параметры URL для авторизации
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const params = new URLSearchParams(window.location.search);
        if (params.get('auth_success') === 'true') {
            const loggedUser = {
                id: parseInt(params.get('id'), 10),
                discordId: params.get('discordId') || params.get('id'), // ID пользователя
                username: params.get('username'),
                avatar: params.get('avatar'),
                minecraftNickname: params.get('minecraftNickname') !== 'null' ? params.get('minecraftNickname') : null,
                minecraftVerified: params.get('minecraftVerified') === 'true'
            };
            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            
            // Очищаем адресную строку от параметров OAuth2
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: '"Press Start 2P", cursive',
                },
            }}
        >
            <Router>
                {/* --- НОВАЯ ЦЕНТРИРОВАННАЯ ШАПКА САЙТА --- */}
                <div style={{ 
                    padding: '15px 30px', 
                    background: 'rgba(15, 15, 15, 0.75)', /* Чуть темнее, чтобы ссылки выделялись */
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
                    display: 'flex', 
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}>
                    
                    {/* 1. Левая часть (Логотип) */}
                    <div style={{ flex: 1 }}>
                        <Link to="/" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', /* Расстояние между картинкой и текстом */
                            textDecoration: 'none' 
                        }}>
                            {/* Сама картинка */}
                            <img 
                                src="/SLSait.png" 
                                alt="Logo" 
                                style={{ 
                                    width: '40px', /* Ширина картинки */
                                    height: '40px', /* Высота картинки */
                                    imageRendering: 'pixelated', /* Оставляем пиксели четкими */
                                    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' /* Небольшая тень */
                                }} 
                            />
                            
                            {/* Текст */}
                            <span style={{ 
                                fontSize: '16px', 
                                color: '#fff', 
                                textShadow: '2px 2px 4px rgba(0,0,0,0.6)' 
                            }}>
                                SwampLand
                            </span>
                        </Link>
                    </div>

                    {/* 2. Центральная часть (Меню) - выравнивание по центру */}
                    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
                        <NavLink to="/" className="nav-link" end>Главная</NavLink>
                        <NavLink to="/rules" className="nav-link">Правила</NavLink>
                        <NavLink to="/commands" className="nav-link">Команды</NavLink>
                        <NavLink to="/seasons" className="nav-link">Сезоны</NavLink>
                        <NavLink to="/store" className="nav-link">Магазин</NavLink>
                    </div>

                    {/* 3. Правая часть (Логин / Кабинет) */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                        {user ? (
                            <NavLink 
                                to="/profile" 
                                className="nav-link" 
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    border: '1px solid rgba(32, 201, 151, 0.3)',
                                    padding: '5px 12px',
                                    borderRadius: '8px',
                                    background: 'rgba(32, 201, 151, 0.05)'
                                }}
                            >
                                <img 
                                    src={user.avatar 
                                        ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png` 
                                        : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                                    alt="Avatar" 
                                    style={{ width: '22px', height: '22px', borderRadius: '50%' }} 
                                />
                                <span style={{ fontSize: '10px' }}>{user.username}</span>
                            </NavLink>
                        ) : (
                            <NavLink 
                                to="/profile" 
                                className="discord-login-btn"
                            >
                                <img src="/Discord.png" alt="Discord" />
                                <span>Войти</span>
                            </NavLink>
                        )}
                        
                        {/* Небольшая ссылка на сам Дискорд сервер */}
                        <a 
                            href="https://discord.gg/FSCHewrPyv" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ opacity: 0.6, display: 'flex', alignItems: 'center' }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                            onMouseOut={(e) => e.currentTarget.style.opacity = 0.6}
                        >
                            <img src="/Discord.png" alt="Discord Server" style={{ width: '18px', height: '18px' }} />
                        </a>
                    </div>

                </div>

                {/* --- МАРШРУТИЗАЦИЯ СТРАНИЦ --- */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/seasons" element={<Seasons />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/store" element={<Store user={user} />} />
                    <Route path="/commands" element={<Commands />} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser} onLogout={handleLogout} />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;