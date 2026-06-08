import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Rules from './pages/Rules';
import Seasons from './pages/Seasons';
import Store from './pages/Store'; // <--- Добавь эту строчку
import Commands from './pages/Commands'; // <--- И эту строчку
import './App.css';

function App() {
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

                    {/* 3. Правая часть (Только Discord) */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                        <a 
                            href="https://discord.gg/FSCHewrPyv" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="discord-login-btn"
                        >
                            <img src="/Discord.png" alt="Discord" />
                            <span>Discord</span>
                        </a>
                    </div>

                </div>

                {/* --- МАРШРУТИЗАЦИЯ СТРАНИЦ --- */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    
                    {/* Пустышки для новых страниц, чтобы не было ошибок при клике */}
                    <Route path="/seasons" element={<Seasons />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/commands" element={<Commands />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;