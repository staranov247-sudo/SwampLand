import React, { useState, useEffect } from 'react';
import { Typography, Spin } from 'antd';

const { Title } = Typography;

const Seasons = () => {
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // --- ПРЯЧЕМ ПЕРСОНАЖА: Добавляем класс-метку ---
        document.body.classList.add('page-seasons');

        // Запрашиваем сезоны с нашего сервера
        fetch('http://localhost:5000/api/seasons')
            .then(res => res.json())
            .then(data => {
                setSeasons(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки сезонов:", err);
                setLoading(false);
            });

        // --- ВОЗВРАЩАЕМ ПЕРСОНАЖА: Убираем метку при уходе со страницы ---
        return () => {
            document.body.classList.remove('page-seasons');
        };
    }, []);

    return (
        <div style={{ padding: '40px 50px 80px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="anim-fade-in anim-float" style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Title style={{ fontSize: '32px', color: '#fff' }}>Архив Сезонов</Title>
                <div style={{ fontSize: '10px', color: '#888' }}>История нашего мира</div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>
            ) : seasons.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Сезонов пока нет. Добавьте их в Админке!</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {seasons.map((season, index) => (
                        <div key={season.id} className={`anim-fade-in delay-${(index % 3) + 1}`} style={{
                            background: 'rgba(25, 25, 25, 0.6)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.3s ease, border-color 0.3s ease'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#20c997'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                        >
                            {/* Картинка сезона */}
                            <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                                <img src={season.imageUrl} alt={season.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            
                            {/* Контент карточки */}
                            <div style={{ padding: '20px' }}>
                                <div style={{ color: '#20c997', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{season.title}</div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                    <span style={{ color: '#888', fontSize: '9px' }}>{season.dateRange}</span>
                                    <span style={{ color: '#20c997', fontSize: '9px' }}>{season.duration}</span>
                                </div>
                                
                                <p style={{ color: '#b3b3b3', fontSize: '10px', lineHeight: '1.6', margin: 0 }}>
                                    {season.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Seasons;