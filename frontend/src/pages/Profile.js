import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, message, Space, Spin } from 'antd';
import { DiscordOutlined, LinkOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const Profile = ({ user, setUser, onLogout }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [mockNickname, setMockNickname] = useState('Steve'); // Для быстрой симуляции
    const [simulatedCode, setSimulatedCode] = useState('');

    // Состояния для истории покупок
    const [purchases, setPurchases] = useState([]);
    const [purchasesLoading, setPurchasesLoading] = useState(false);

    // Добавление класса страницы на body
    useEffect(() => {
        document.body.classList.add('page-profile');
        return () => {
            document.body.classList.remove('page-profile');
        };
    }, []);

    // Функция загрузки покупок пользователя
    const loadPurchases = async () => {
        if (!user) return;
        setPurchasesLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${user.id}/purchases`);
            setPurchases(response.data);
        } catch (error) {
            console.error("Не удалось загрузить историю покупок:", error);
        } finally {
            setPurchasesLoading(false);
        }
    };

    // Загружаем покупки при смене пользователя
    useEffect(() => {
        if (user) {
            loadPurchases();
        }
    }, [user]);

    const handleLink = async () => {
        if (!code || code.length !== 6) {
            message.warning('Код должен состоять из 6 цифр!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/link-minecraft', {
                userId: user.id,
                code: code
            });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            message.success(`Аккаунт Minecraft (${response.data.minecraftNickname}) успешно привязан!`);
            setCode('');
        } catch (error) {
            message.error(error.response?.data?.error || 'Ошибка при привязке аккаунта');
        } finally {
            setLoading(false);
        }
    };

    const handleUnlink = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/unlink-minecraft', {
                userId: user.id
            });
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            message.success('Аккаунт Minecraft успешно отвязан');
        } catch (error) {
            message.error('Не удалось отвязать аккаунт');
        } finally {
            setLoading(false);
        }
    };

    // Функция для симуляции отправки кода с сервера Майнкрафта
    const handleSimulateMinecraftCommand = async () => {
        if (!mockNickname) {
            message.warning('Введите никнейм для симуляции!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/minecraft/generate-code', {
                nickname: mockNickname
            });
            setSimulatedCode(response.data.code);
            message.success(`[Симуляция] Игрок ${mockNickname} получил код: ${response.data.code}`);
        } catch (error) {
            message.error('Ошибка симуляции');
        }
    };

    const handleMockLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/mock-login');
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            message.success('Вы успешно вошли через тестовый аккаунт!');
        } catch (error) {
            message.error('Ошибка входа');
        }
    };

    if (!user) {
        return (
            <div style={{ padding: '0 20px', maxWidth: '600px', margin: '10vh auto', textAlign: 'center' }} className="anim-fade-in">
                <Card className="mc-card" style={{ padding: '20px' }}>
                    <DiscordOutlined style={{ fontSize: '64px', color: '#5865F2', marginBottom: '20px' }} />
                    <Title level={2} style={{ marginBottom: '10px', fontSize: '18px' }}>Личный Кабинет</Title>
                    <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '12px', lineHeight: '1.6' }}>
                        Войдите через Discord, чтобы управлять своим профилем и подтвердить свой игровой никнейм.
                    </p>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Button 
                            type="primary" 
                            href="http://localhost:5000/api/auth/discord/login" 
                            style={{ 
                                width: '100%', 
                                height: '50px', 
                                background: '#5865F2', 
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <DiscordOutlined /> Войти через Discord
                        </Button>

                        <div style={{ color: '#555', margin: '10px 0', fontSize: '10px' }}>ИЛИ ДЛЯ ТЕСТИРОВАНИЯ</div>

                        <Button 
                            onClick={handleMockLogin}
                            style={{ 
                                width: '100%', 
                                height: '45px', 
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#fff'
                            }}
                        >
                            ⚡ Войти под тест-аккаунтом (Mock)
                        </Button>
                    </Space>
                </Card>
            </div>
        );
    }

    const avatarUrl = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';

    return (
        <div style={{ padding: '0 20px 60px', maxWidth: '1000px', margin: '60px auto' }} className="anim-fade-in">
            <Title level={1} style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px' }}>Личный Кабинет</Title>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', alignItems: 'start' }} className="profile-grid">
                
                {/* Левая колонка: Профиль Discord */}
                <Card className="mc-card" style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '15px' }}>
                        <img 
                            src={avatarUrl} 
                            alt="Avatar" 
                            style={{ 
                                width: '96px', 
                                height: '96px', 
                                borderRadius: '50%',
                                border: '3px solid #5865F2',
                                boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)'
                            }} 
                        />
                        <div style={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            right: 0, 
                            background: '#5865F2', 
                            borderRadius: '50%', 
                            width: '28px', 
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                        }}>
                            <DiscordOutlined style={{ color: '#fff', fontSize: '14px' }} />
                        </div>
                    </div>

                    <Title level={3} style={{ fontSize: '14px', marginBottom: '5px' }}>{user.username}</Title>
                    <Text type="secondary" style={{ fontSize: '10px', color: '#888' }}>ID: {user.discordId}</Text>

                    <div style={{ marginTop: '30px' }}>
                        <Button 
                            danger 
                            onClick={onLogout} 
                            style={{ width: '100%', height: '40px' }}
                        >
                            Выйти из аккаунта
                        </Button>
                    </div>
                </Card>

                {/* Правая колонка: Привязка Minecraft */}
                <Card className="mc-card" title={<span><SafetyCertificateOutlined /> Привязка Minecraft</span>}>
                    
                    {user.minecraftVerified ? (
                        /* ПОДТВЕРЖДЕННЫЙ СТАТУС */
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <img 
                                    src={`https://minotar.net/helm/${user.minecraftNickname}/100.png`} 
                                    alt="Skin Head" 
                                    style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        imageRendering: 'pixelated',
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                                    }} 
                                    onError={(e) => {
                                        e.target.src = 'https://minotar.net/helm/Char/100.png';
                                    }}
                                />
                            </div>
                            
                            <Title level={3} style={{ color: '#20c997', fontSize: '16px', marginBottom: '5px' }}>
                                Никнейм привязан ✅
                            </Title>
                            
                            <Title level={2} style={{ fontSize: '20px', marginBottom: '20px' }}>
                                {user.minecraftNickname}
                            </Title>
                            
                            <p style={{ color: '#888', fontSize: '11px', marginBottom: '30px' }}>
                                Ваш Discord-аккаунт успешно соединен с лицензией/игрой на сервере.
                            </p>

                            <Button 
                                type="dashed" 
                                danger 
                                onClick={handleUnlink} 
                                loading={loading}
                            >
                                Отвязать никнейм
                            </Button>
                        </div>
                    ) : (
                        /* НЕПОДТВЕРЖДЕННЫЙ СТАТУС */
                        <div>
                            <div style={{ 
                                background: 'rgba(255, 77, 79, 0.08)', 
                                border: '1px solid rgba(255, 77, 79, 0.2)', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                <Text style={{ color: '#ff4d4f', fontSize: '11px' }}>
                                    Игровой никнейм не подтвержден ❌
                                </Text>
                            </div>

                            <Title level={4} style={{ fontSize: '11px', color: '#fff', marginBottom: '15px' }}>ИНСТРУКЦИЯ:</Title>
                            
                            <div style={{ color: '#ccc', fontSize: '10px', lineHeight: '1.8', marginBottom: '25px' }}>
                                <div style={{ marginBottom: '8px' }}>1. Зайдите на сервер SwampLand (<b>mc.swampland.su</b>)</div>
                                <div style={{ marginBottom: '8px' }}>2. Напишите в чате команду: <code style={{ background: '#111', padding: '2px 6px', borderRadius: '4px', color: '#ffd700' }}>/code</code> или <code style={{ background: '#111', padding: '2px 6px', borderRadius: '4px', color: '#ffd700' }}>/link</code></div>
                                <div>3. Полученный 6-значный цифровой код введите ниже:</div>
                            </div>

                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                <Input 
                                    placeholder="Введите 6 цифр кода" 
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                    style={{ 
                                        height: '50px', 
                                        textAlign: 'center', 
                                        fontSize: '18px', 
                                        letterSpacing: '10px',
                                        fontFamily: 'monospace',
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(10, 10, 10, 0.7)'
                                    }}
                                />
                                
                                <Button 
                                    type="primary" 
                                    onClick={handleLink} 
                                    loading={loading}
                                    style={{ width: '100%', height: '45px' }}
                                >
                                    <LinkOutlined /> Подтвердить код
                                </Button>
                            </Space>

                            {/* Раздел симуляции для разработчика */}
                            <div style={{ 
                                marginTop: '40px', 
                                paddingTop: '20px', 
                                borderTop: '1px solid rgba(255,255,255,0.05)' 
                            }}>
                                <Text style={{ color: '#ffd700', fontSize: '10px', display: 'block', marginBottom: '10px' }}>
                                    🛠️ Симулятор плагина Minecraft (Для разработки)
                                </Text>
                                
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <Input 
                                        placeholder="Никнейм в Minecraft" 
                                        value={mockNickname} 
                                        onChange={(e) => setMockNickname(e.target.value)} 
                                        style={{ height: '35px', fontSize: '10px' }}
                                    />
                                    <Button 
                                        onClick={handleSimulateMinecraftCommand} 
                                        style={{ height: '35px', fontSize: '9px' }}
                                    >
                                        Получить код
                                    </Button>
                                </div>

                                {simulatedCode && (
                                    <div style={{ 
                                        background: 'rgba(255, 215, 0, 0.1)', 
                                        border: '1px dashed #ffd700', 
                                        padding: '10px', 
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        color: '#ffd700',
                                        textAlign: 'center'
                                    }}>
                                        В игре показано: "Код для {mockNickname}: <b>{simulatedCode}</b>"
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                </Card>

            </div>

            {/* Раздел: История покупок */}
            <Card 
                className="mc-card" 
                style={{ marginTop: '30px' }} 
                title={<span><SafetyCertificateOutlined style={{ marginRight: '8px' }} />История покупок</span>}
            >
                {purchasesLoading ? (
                    <div style={{ textAlign: 'center', padding: '30px' }}><Spin /></div>
                ) : purchases.length === 0 ? (
                    <div style={{ color: '#666', fontSize: '10px', textAlign: 'center', padding: '20px 0' }}>
                        Вы пока не совершали покупок. Загляните в наш <a href="/store" style={{ color: '#20c997', textDecoration: 'underline' }}>Магазин</a>!
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                    <th style={{ padding: '12px 10px', color: '#888' }}>Товар</th>
                                    <th style={{ padding: '12px 10px', color: '#888' }}>Категория</th>
                                    <th style={{ padding: '12px 10px', color: '#888' }}>Ник в игре</th>
                                    <th style={{ padding: '12px 10px', color: '#888' }}>Цена</th>
                                    <th style={{ padding: '12px 10px', color: '#888' }}>Дата</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map(p => {
                                    const dateStr = new Date(p.createdAt).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });
                                    return (
                                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                                            <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 'bold' }}>{p.itemName}</td>
                                            <td style={{ padding: '12px 10px', color: '#ccc' }}>{p.target}</td>
                                            <td style={{ padding: '12px 10px', color: '#ffd700' }}>{p.minecraftNickname}</td>
                                            <td style={{ padding: '12px 10px', color: '#20c997', fontWeight: 'bold' }}>{p.price}</td>
                                            <td style={{ padding: '12px 10px', color: '#555' }}>{dateStr}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

        </div>
    );
};

export default Profile;
