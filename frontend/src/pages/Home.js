import React from 'react';
import { Typography, message } from 'antd';
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Home = () => {
    const serverIp = 'mc.swampland.su';

    const copyIP = () => {
        navigator.clipboard.writeText(serverIp);
        message.success(`IP ${serverIp} скопирован! Ждем тебя в игре!`);
    };

    return (
        <div style={{ padding: '0 20px 60px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>

            <div style={{ marginTop: '12vh' }}>
                
                {/* ЗАГОЛОВОК: Появляется сразу + Левитирует (РАЗДЕЛЕННЫЕ БЛОКИ) */}
                <div className="anim-fade-in">
                    <div className="anim-float">
                        <Title style={{ fontSize: '60px', marginBottom: '20px' }}>
                        SwampLand
                        </Title>
                    </div>
                </div>

                {/* ОПИСАНИЕ: Появляется с небольшой задержкой (.delay-1) */}
                <p className="anim-fade-in delay-1" style={{
                    color: '#e0e0e0',
                    fontSize: '15px',
                    lineHeight: '1.8',
                    maxWidth: '800px',
                    margin: '0 auto 40px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Пространство с идеальными условиями для раскрытия собственного 
                    творческого потенциала в среде ванильного выживания
                </p>

                {/* КНОПКА IP: Появляется последней (.delay-2) + Пульсирует (.anim-pulse) */}
                <div className="anim-fade-in delay-2" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <div
                        onClick={copyIP}
                        className="anim-pulse" /* Класс пульсации */
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#ffffff',
                            color: '#000000',
                            padding: '0 30px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            height: '56px',
                            transition: 'transform 0.2s ease' /* Оставили только увеличение при наведении */
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <span style={{ color: '#888', marginRight: '15px', fontSize: '10px' }}>IP адрес</span>
                        <b style={{ fontSize: '14px' }}>{serverIp}</b>
                        <CopyOutlined style={{ marginLeft: '15px', color: '#333', fontSize: '16px' }} />
                    </div>
                </div>

                {/* МЕЛКИЙ ТЕКСТ: Появляется в самом конце (.delay-3) */}
                <div className="anim-fade-in delay-3" style={{ fontSize: '12px', color: '#666', textShadow: 'none' }}>
                    Для игры не нужна лицензия Minecraft. Версия сервера — 1.21.8
                </div>

            </div>

             {/* --- ИНФОРМАЦИОННАЯ ПЛАШКА В ЛЕВОМ НИЖНЕМ УГЛУ --- */}
             <div 
                className="anim-fade-in delay-3" 
                style={{
                    position: 'fixed',
                    bottom: 'clamp(200px, 3vw, 30px)', /* Отступ от низа тоже адаптивный */
                    left: 'clamp(50px, 3vw, 30px)',
                    background: 'rgba(25, 25, 25, 0.6)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    /* Внутренние отступы меняются в зависимости от экрана */
                    padding: 'clamp(50px, 1.5vw, 200px)',
                    /* Ширина рамки адаптируется, но не больше 320px */
                    width: 'clamp(200px, 20vw, 800px)', 
                    textAlign: 'left',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    zIndex: 1000
                }}
            >
                {/* Заголовок плашки с иконкой */}
                <div style={{ display: 'flex', alignItems: 'left', marginBottom: '10px', color: '#ffffff' }}>
                    <InfoCircleOutlined style={{ 
                        fontSize: 'clamp(14px, 1.2vw, 16px)', /* Иконка масштабируется */
                        marginRight: '10px', 
                        color: '#0066ff' 
                    }} />
                    <span style={{ 
                        fontSize: 'clamp(10px, 1vw, 12px)', /* Заголовок масштабируется */
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                    }}>
                        Информация
                    </span>
                </div>
                
                {/* Текст плашки */}
                <div style={{ 
                    color: '#b3b3b3', 
                    fontSize: 'clamp(12px, 0.8vw, 200px)', /* Текст масштабируется */
                    lineHeight: '1.7' 
                }}>
                    Предварительная дата открытия сезона - 1 июня, однако она может быть изменена.
                </div>
            </div>
        </div>
    );
};

export default Home;