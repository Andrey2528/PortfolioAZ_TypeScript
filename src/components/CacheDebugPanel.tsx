import { useEffect, useState } from 'react';
import { cacheManager } from '@/utils/cacheManager';

/**
 * Компонент для відображення статистики та управління кешем
 * Корисно для розробки та діагностики
 */
const CacheDebugPanel = () => {
    const [stats, setStats] = useState(cacheManager.getStats());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Оновлювати статистику кожні 5 секунд
        const interval = setInterval(() => {
            setStats(cacheManager.getStats());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleClearCache = () => {
        cacheManager.clearAll();
        setStats(cacheManager.getStats());
    };

    const handleClearOldCache = () => {
        cacheManager.clearOldCache();
        setStats(cacheManager.getStats());
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
        );
    };

    const formatAge = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) return `${hours}г ${minutes % 60}хв`;
        if (minutes > 0) return `${minutes}хв`;
        return `${seconds}с`;
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 9999,
                    fontSize: '12px',
                }}
            >
                📊 Cache Stats
            </button>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '400px',
                maxHeight: '500px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 9999,
                overflow: 'auto',
                fontSize: '13px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '16px' }}>
                    📊 Cache Statistics
                </h3>
                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer',
                    }}
                >
                    ✕
                </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Всього записів:</strong> {stats.totalItems}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Загальний розмір:</strong>{' '}
                    {formatBytes(stats.totalSize)}
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <button
                    onClick={handleClearCache}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '10px',
                        fontSize: '12px',
                    }}
                >
                    🗑️ Очистити весь кеш
                </button>
                <button
                    onClick={handleClearOldCache}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                >
                    🧹 Очистити старі дані
                </button>
            </div>

            <div>
                <h4
                    style={{
                        marginTop: '0',
                        fontSize: '14px',
                        marginBottom: '10px',
                    }}
                >
                    Деталі кешу:
                </h4>
                <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                    {stats.items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '8px',
                                marginBottom: '8px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px',
                                fontSize: '11px',
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: '4px',
                                }}
                            >
                                {item.key}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>Розмір: {formatBytes(item.size)}</span>
                                <span>Вік: {formatAge(item.age)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CacheDebugPanel;
