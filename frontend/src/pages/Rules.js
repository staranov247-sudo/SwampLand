import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Rules = () => {
    const [activeTab, setActiveTab] = useState('Общие правила');
    // Прокручиваем страницу наверх при открытии И ДОБАВЛЯЕМ КЛАСС
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.add('page-rules'); // Добавить уникальный класс
        return () => {
            document.body.classList.remove('page-rules'); // Убрать его при уходе со страницы
        };
    }, []);

    // Общий стиль для наших "стеклянных" карточек
    const cardStyle = {
        background: 'rgba(25, 25, 25, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '20px',
        textAlign: 'left',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    };

    const ruleTitleStyle = {
        color: '#20c997', // Бирюзовый акцент для заголовков
        fontSize: '14px',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(32, 201, 151, 0.2)',
        paddingBottom: '10px'
    };

    const textStyle = {
        color: '#b3b3b3',
        fontSize: '10px',
        lineHeight: '2.2', // Увеличенный межстрочный интервал для читаемости
    };

    const highlightStyle = {
        color: '#ff4d4f', // Красный цвет для строгих запретов
        fontWeight: 'bold',
        marginTop: '15px',
        display: 'block'
    };

    const allowedMods = [
        { name: "AppleSkin", url: "https://modrinth.com/mod/appleskin" },
        { name: "Autoclicker Legacy", url: "https://modrinth.com/mod/autoclicker-legacy" },
        { name: "Badlion Client", url: "https://www.badlion.net/minecraft-client" },
        { name: "BetterF3", url: "https://modrinth.com/mod/betterf3" },
        { name: "Blur+", url: "https://modrinth.com/mod/blur-plus" },
        { name: "Bobby", url: "https://modrinth.com/mod/bobby" },
        { name: "Chat Heads", url: "https://modrinth.com/mod/chat-heads" },
        { name: "Essential", url: "https://modrinth.com/mod/essential" },
        { name: "Fabric API", url: "https://modrinth.com/mod/fabric-api" },
        { name: "Flashback", url: "https://modrinth.com/mod/flashback" },
        { name: "LegacyFreecam", url: "https://modrinth.com/mod/legacyfreecam" },
        { name: "Held Item Info", url: "https://modrinth.com/mod/held-item-info" },
        { name: "Iris Shaders", url: "https://www.irisshaders.dev/" },
        { name: "JourneyMap", url: "https://modrinth.com/plugin/journeymap" },
        { name: "JEI", url: "https://modrinth.com/mod/jei" },
        { name: "LambDynamicLights", url: "https://modrinth.com/mod/lambdynamiclights" },
        { name: "Litematica", url: "https://modrinth.com/mod/litematica" },
        { name: "Lithium", url: "https://modrinth.com/mod/lithium" },
        { name: "Logical Zoom", url: "https://modrinth.com/mod/logical-zoom" },
        { name: "MiniHUD", url: "https://modrinth.com/mod/minihud" },
        { name: "ModMenu", url: "https://modrinth.com/mod/modmenu" },
        { name: "Not Enough Crashes", url: "https://modrinth.com/mod/notenoughcrashes" },
        { name: "OffersHUD", url: "https://modrinth.com/mod/offershud" },
        { name: "OptiFabric", url: "https://optifabric.com/minecraft" },
        { name: "OptiFine", url: "https://optifine.net/downloads" },
        { name: "Replay Mod", url: "https://www.replaymod.com/download/" },
        { name: "ShulkerBoxTooltip", url: "https://modrinth.com/mod/shulkerboxtooltip" },
        { name: "Simple Voice Chat", url: "https://modrinth.com/plugin/simple-voice-chat" },
        { name: "Sodium", url: "https://modrinth.com/mod/sodium" },
        { name: "Stendhal", url: "https://modrinth.com/mod/stendhal" },
        { name: "Twitch Chat", url: "https://modrinth.com/mod/twitch-chat" },
        { name: "VoxelMap Updated", url: "https://modrinth.com/mod/voxelmap-updated" },
        { name: "Xaero's Minimap", url: "https://modrinth.com/mod/xaeros-minimap" },
        { name: "Xaero's World Map", url: "https://modrinth.com/mod/xaeros-world-map" },
        { name: "Zoomify", url: "https://modrinth.com/mod/zoomify" }
    ];

    const forbiddenMods = [
        "Авто-тотем (любого вида)",
        "Изменение визуала под водой/лавой",
        "Моды, играющие за игрока (ИИ, принтер)",
        "Чит-модификации (любого вида)",
        "X-ray модификации и ресурспаки",
        "Accessible Step",
        "Accurate Block Placement",
        "AFKPeace",
        "Aristois",
        "Attack Through Grass",
        "Auto Shulker Inventory Loader",
        "AutoSwitch",
        "Baritone",
        "Bedrock Miner",
        "Better PVP (все версии)",
        "BetterClicker",
        "Bridging Mod",
        "ClientCommands",
        "CMDCam",
        "Double Hotbar",
        "EasyPlaceFix",
        "Elytra Swapper",
        "Elytra Utilities",
        "FindMe",
        "FlightAssistant",
        "FreeCam (читы)",
        "Impact",
        "Inertia",
        "Inventory Plus",
        "Inventory Tabs",
        "InvMove",
        "ItemSwapper",
        "Jello",
        "LavaClearView",
        "Librarian Trade Finder",
        "LookAtPlayer",
        "MidnightControlsExtra",
        "MultiConnect",
        "No Mining Cooldown",
        "SeedCracker (и его аналоги)",
        "Sigma",
        "Squake",
        "Stack to Nearby Chests",
        "Trajectory Preview",
        "Tweakeroo",
        "Wall-Jump",
        "Wurst"
    ];

  return (
        <div style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '900px', margin: '0 auto' }}>
            
            <h2 style={{ 
                color: '#20c997', 
                textAlign: 'center', 
                marginBottom: '30px',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '24px'
            }}>
                Правила сервера
            </h2>

            {/* НАВИГАЦИЯ: Кнопки вкладок */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'center' }}>
                {['Общие правила', 'Моды', 'Спавн'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: activeTab === tab ? '#20c997' : 'rgba(25, 25, 25, 0.6)',
                            color: activeTab === tab ? '#fff' : '#e0e0e0',
                            border: `1px solid ${activeTab === tab ? '#20c997' : 'rgba(32, 201, 151, 0.3)'}`,
                            padding: '12px 25px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: '12px',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxShadow: activeTab === tab ? '0 0 15px rgba(32, 201, 151, 0.4)' : 'none'
                        }}
                        onMouseOver={(e) => { if(activeTab !== tab) e.target.style.borderColor = '#20c997'; }}
                        onMouseOut={(e) => { if(activeTab !== tab) e.target.style.borderColor = 'rgba(32, 201, 151, 0.3)'; }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* КОНТЕНТ ВКЛАДОК */}
            <div>
                {/* Вкладка 1: ОБЩИЕ ПРАВИЛА */}
                {activeTab === 'Общие правила' && (
                    <>
                        <div className="anim-fade-in" style={cardStyle}>
                            <div style={ruleTitleStyle}>1. Общие правила</div>
                            <div style={textStyle}>
                                <div><b>1.1.</b> Ответственность всегда несет владелец аккаунта, независимо от того, кто совершал действия под данным аккаунтом.</div>
                                <div><b>1.2.</b> Запрещено намеренно мешать другим игрокам (гриферить, убивать без причины, ломать постройки без разрешения и т.д.).</div>
                                <div><b>1.3.</b> Запрещено использование читов, хаков, ботов и любых других сторонних программ, дающих нечестное преимущество.</div>
                                <div><b>1.4.</b> Запрещено оставлять бесхозные или незаконченные постройки, которые могут засорять мир.</div>
                                <div><b>1.5.</b> Запрещено специально создавать излишнюю нагрузку на сервер (строить лаг-машины).</div>
                            </div>
                        </div>

                        <div className="anim-fade-in delay-1" style={cardStyle}>
                            <div style={ruleTitleStyle}>2. Правила общения</div>
                            <div style={textStyle}>
                                <div><b>2.1.</b> Запрещено спамить и флудить.</div>
                                <div><b>2.2.</b> Запрещена реклама в любом виде.</div>
                                <div><b>2.3.</b> Запрещена отправка любых ссылок в общий чат.</div>
                                <div><b>2.4.</b> Запрещено поднимать политические темы в общем чате.</div>
                                
                                {/* Спец. блок с запретами */}
                                <div style={{ 
                                    marginTop: '20px', 
                                    padding: '15px', 
                                    background: 'rgba(255, 77, 79, 0.05)', 
                                    borderLeft: '3px solid #ff4d4f',
                                    borderRadius: '0 8px 8px 0'
                                }}>
                                    <span style={highlightStyle}>ЗАПРЕЩЕНО:</span>
                                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                        <li>Дюп. <i style={{ color: '#888' }}>(Исключение: ковры.)</i></li>
                                        <li>ПВП без обоюдного согласия.</li>
                                        <li>Добыча руд, ресурсов и поиск данжей с помощью модификаций. <i style={{ color: '#888' }}>(Миникарта не запрещена.)</i></li>
                                        <li>Порча терраформинга и строительство в воздухе и любых водоёмах построек, логически не подходящих под окружение.</li>
                                        <li>Телепортация на большие расстояния с помощью пушек и механизмов.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="anim-fade-in delay-3" style={cardStyle}>
                            <div style={ruleTitleStyle}>3. Правила мира Энда/Незера</div>
                            <div style={textStyle}>
                                <div><b>3.1.</b> Все фермы в мире Энда/Незера - общие.</div>
                                <div><b>3.2.</b> Ответственность за TPS в мире несут сами игроки. Низкий TPS - не причина для возврата ресурсов при смерти.</div>
                                <div><b>3.3.</b> Один игрок может иметь только 3 пары элитр. Остальные должны быть отправлены на продажу.</div>
                            </div>
                        </div>

                        <div className="anim-fade-in delay-4" style={cardStyle}>
                            <div style={ruleTitleStyle}>4. Правила территорий и приватов</div>
                            <div style={textStyle}>
                                <div><b>4.1.</b> Запрещено приватить любые натуральные структуры (деревни, древние города, крепости, данжи и т.д.). <i style={{ color: '#888' }}>(Исключение: Разрешено заприватить Аванпост разбойников, но строго один на одного игрока.)</i></div>
                            </div>
                        </div>
                    </>
                )}

                {/* Вкладка 2: МОДЫ */}
                {activeTab === 'Моды' && (
                    <div className="anim-fade-in">
                        {/* Блок разрешённых модов */}
                        <div style={{
                            background: 'rgba(25, 25, 25, 0.6)', /* Бирюзовый фон */
                            borderLeft: '3px solid #55FF55',
                            padding: '20px 25px',
                            borderRadius: '4px',
                            marginBottom: '30px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}>
                            <div style={{ color: '#55FF55', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>
                                Разрешённые модификации:
                            </div>
                            <ul style={{ color: '#cccccc', fontSize: '10px', lineHeight: '2', margin: 0, paddingLeft: '20px', columnCount: 3, columnGap: '20px' }}>
                                {allowedMods.map((mod, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>
                                        <a href={mod.url} target="_blank" rel="noopener noreferrer" style={{ color: '#cccccc', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#55FF55'} onMouseOut={(e) => e.currentTarget.style.color = '#cccccc'}>
                                            {mod.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Блок запрещённых модов */}
                        <div style={{
                            background: 'rgba(25, 25, 25, 0.6)', /* Тёмно-бирюзовый фон */
                            borderLeft: '3px solid #FF5555',
                            padding: '20px 25px',
                            borderRadius: '4px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}>
                            <div style={{ color: '#FF5555', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase' }}>
                                Запрещённые модификации:
                            </div>
                            <ul style={{ color: '#cccccc', fontSize: '10px', lineHeight: '2', margin: 0, paddingLeft: '20px', columnCount: 3, columnGap: '20px' }}>
                                {forbiddenMods.map((mod, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>
                                        {mod}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {activeTab === 'Спавн' && (
                    <>
                        <div className="anim-fade-in">
                            <div style={cardStyle}>
                                <div style={ruleTitleStyle}>Правила спавна</div>
                                <div style={textStyle}>
                                    <div><b>1.</b> Вокруг спавна (радиус ~200 блоков) запрещено строить любые постройки, кроме декоративных. <i style={{ color: '#888' }}>(Исключение: разрешены небольшие лавочки, тропинки и т.д.)</i></div>
                                    <div><b>2.</b> Запрещено строить фермы, механизмы и любые постройки, которые могут создавать нагрузку на сервер в радиусе ~400 блоков от спавна.</div>
                                </div>
                            </div>
                        </div>
                    </>
                )} 
            </div>
        </div>
    );
};

export default Rules;