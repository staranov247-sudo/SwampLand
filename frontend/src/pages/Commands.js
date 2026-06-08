import React from 'react';

const Commands = () => {
    // Наш фирменный стиль панелей
    const glassPanelStyle = {
        color: '#fff',
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto' // Центрируем по середине экрана
    };

    const commandsList = [
        { 
            cmd: '/skin set [ник]', 
            desc: 'Изменить скин (используйте ники игроков у которых есть лицензия).' 
        },
        { 
            cmd: '/sit', 
            desc: 'Сидеть.' 
        },
        { 
            cmd: '/msg [ник] [текст]', 
            desc: 'Написать человеку в личные сообщения.' 
        },
        { 
            cmd: '/lobby', 
            desc: 'Телепортация в лобби сервера.' 
        },
        {
            cmd: '/roll',
            desc: 'выдаёт рандомное число'
        },
    ];

    return (
        <div style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <div style={glassPanelStyle}>
                <h2 style={{ 
                    color: '#20c997', // Наш синий цвет
                    textAlign: 'center', 
                    marginBottom: '30px',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '24px'
                }}>
                    Команды сервера
                </h2>

                <div className="anim-fade-in" style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {commandsList.map((item, index) => (
                            <div key={index} style={{
                                background: 'rgba(25, 25, 25, 0.6)',
                                padding: '15px 20px',
                                borderRadius: '8px',
                                borderLeft: '4px solid #20c997',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                <div style={{
                                    color: '#20c997',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace'
                                }}>
                                    {item.cmd}
                                </div>
                                <div style={{ color: '#cccccc', fontSize: '14px', lineHeight: '1.5' }}>
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commands;