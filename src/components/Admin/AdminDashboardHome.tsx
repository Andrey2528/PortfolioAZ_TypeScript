import React, { useState, useEffect } from 'react';
import {
    getCertificates,
    getSkills,
    getSocialLinks,
} from '../../api/connectDB/dataAPI';
import { fetchPortfolioCards } from '../../api/connectDB/adminAPI';
import { seedInitialData, seedPortfolioData } from '../../utils/seedData';
import MigrationModal from './MigrationModal';
import '../../shared/styles/components/Admin/AdminDashboardHome.scss';

interface SiteStats {
    portfolio: number;
    certificates: number;
    skills: number;
    social: number;
    totalProjects: number;
    lastUpdated: string;
}

interface AdminDashboardHomeProps {
    onRefreshData: () => void;
}

const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({
    onRefreshData,
}) => {
    const [stats, setStats] = useState<SiteStats>({
        portfolio: 0,
        certificates: 0,
        skills: 0,
        social: 0,
        totalProjects: 0,
        lastUpdated: '',
    });
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const [showMigrationModal, setShowMigrationModal] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            const [portfolio, certificates, skills, social] = await Promise.all(
                [
                    fetchPortfolioCards(),
                    getCertificates(),
                    getSkills(),
                    getSocialLinks(),
                ],
            );

            const totalProjects =
                portfolio.length +
                certificates.length +
                skills.length +
                social.length;

            setStats({
                portfolio: portfolio.length,
                certificates: certificates.length,
                skills: skills.length,
                social: social.length,
                totalProjects,
                lastUpdated: new Date().toLocaleString('uk-UA'),
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedData = async () => {
        if (
            !confirm(
                'Ви впевнені, що хочете завантажити початкові дані? Це може перезаписати існуючі дані.',
            )
        ) {
            return;
        }

        setSeeding(true);
        try {
            const result = await seedInitialData();
            if (result.success) {
                alert('Дані успішно завантажені!');
                loadStats();
                onRefreshData();
            } else {
                alert('Помилка завантаження даних: ' + result.message);
            }
        } catch (error) {
            console.error('Error seeding data:', error);
            alert('Помилка завантаження даних');
        } finally {
            setSeeding(false);
        }
    };

    const handleSeedPortfolio = async () => {
        if (
            !confirm(
                'Ви впевнені, що хочете завантажити дані портфоліо? Це може перезаписати існуючі проекти.',
            )
        ) {
            return;
        }

        setSeeding(true);
        try {
            const result = await seedPortfolioData();
            if (result.success) {
                alert(result.message);
                loadStats();
                onRefreshData();
            } else {
                alert(
                    'Помилка завантаження портфоліо: ' +
                        (result.error || 'Невідома помилка'),
                );
            }
        } catch (error) {
            console.error('Error seeding portfolio:', error);
            alert('Помилка завантаження портфоліо');
        } finally {
            setSeeding(false);
        }
    };

    const handleMigrateIds = () => {
        setShowMigrationModal(true);
    };

    const handleMigrationComplete = () => {
        loadStats();
        onRefreshData();
        setShowMigrationModal(false);
    };

    const getProgressColor = (value: number, max: number = 50) => {
        const percentage = (value / max) * 100;
        if (percentage < 30) return 'low';
        if (percentage < 70) return 'medium';
        return 'high';
    };

    if (loading) {
        return (
            <div className="admin-home">
                <div className="loading-stats">
                    <div className="spinner"></div>
                    <p>Завантаження статистики...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-home">
            <div className="welcome-section">
                <h1>🎛️ Панель управління сайтом</h1>
                <p>Управляйте контентом вашого портфоліо з одного місця</p>
                <div className="last-updated">
                    Останнє оновлення: {stats.lastUpdated}
                </div>
            </div>

            <div className="stats-overview">
                <h2>📊 Статистика сайту</h2>

                <div className="stats-grid">
                    <div className="stat-card portfolio">
                        <div className="stat-icon">💼</div>
                        <div className="stat-content">
                            <h3>Проекти портфоліо</h3>
                            <div className="stat-number">{stats.portfolio}</div>
                            <div
                                className={`stat-progress ${getProgressColor(stats.portfolio, 20)}`}
                            >
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${Math.min((stats.portfolio / 20) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                            <p>Завершені проекти</p>
                        </div>
                    </div>

                    <div className="stat-card certificates">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-content">
                            <h3>Сертифікати</h3>
                            <div className="stat-number">
                                {stats.certificates}
                            </div>
                            <div
                                className={`stat-progress ${getProgressColor(stats.certificates, 15)}`}
                            >
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${Math.min((stats.certificates / 15) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                            <p>Здобуті нагороди</p>
                        </div>
                    </div>

                    <div className="stat-card skills">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-content">
                            <h3>Навички</h3>
                            <div className="stat-number">{stats.skills}</div>
                            <div
                                className={`stat-progress ${getProgressColor(stats.skills, 30)}`}
                            >
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${Math.min((stats.skills / 30) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                            <p>Освоєні технології</p>
                        </div>
                    </div>

                    <div className="stat-card social">
                        <div className="stat-icon">🔗</div>
                        <div className="stat-content">
                            <h3>Соц. мережі</h3>
                            <div className="stat-number">{stats.social}</div>
                            <div
                                className={`stat-progress ${getProgressColor(stats.social, 10)}`}
                            >
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${Math.min((stats.social / 10) * 100, 100)}%`,
                                    }}
                                ></div>
                            </div>
                            <p>Підключені платформи</p>
                        </div>
                    </div>
                </div>

                <div className="total-stats">
                    <div className="total-card">
                        <h3>📈 Загальна статистика</h3>
                        <div className="total-content">
                            <div className="total-number">
                                {stats.totalProjects}
                            </div>
                            <p>Загальна кількість елементів</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-actions-section">
                <h2>⚙️ Дії управління</h2>
                <p>Основні операції для роботи з даними</p>

                <div className="admin-actions">
                    <div className="action-card seed-all">
                        <div className="action-icon">🌱</div>
                        <div className="action-content">
                            <h3>Завантажити всі дані</h3>
                            <p>
                                Завантажує всі початкові дані: портфоліо,
                                сертифікати, навички та соціальні мережі
                            </p>
                            <button
                                className="btn btn-secondary"
                                onClick={handleSeedData}
                                disabled={seeding}
                            >
                                {seeding
                                    ? 'Завантаження...'
                                    : '🌱 Завантажити всі дані'}
                            </button>
                        </div>
                    </div>

                    <div className="action-card seed-portfolio">
                        <div className="action-icon">💼</div>
                        <div className="action-content">
                            <h3>Завантажити портфоліо</h3>
                            <p>
                                Завантажує тільки проекти портфоліо з
                                підготовлених даних
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={handleSeedPortfolio}
                                disabled={seeding}
                            >
                                {seeding
                                    ? 'Завантаження...'
                                    : '💼 Завантажити портфоліо'}
                            </button>
                        </div>
                    </div>

                    <div className="action-card migrate">
                        <div className="action-icon">🔄</div>
                        <div className="action-content">
                            <h3>Мігрувати ID</h3>
                            <p>
                                Перетворює складні ID проектів на прості числові
                                (1, 2, 3...)
                            </p>
                            <button
                                className="btn btn-warning"
                                onClick={handleMigrateIds}
                            >
                                🔄 Мігрувати ID
                            </button>
                        </div>
                    </div>

                    <div className="action-card refresh">
                        <div className="action-icon">🔄</div>
                        <div className="action-content">
                            <h3>Оновити статистику</h3>
                            <p>
                                Перезавантажує всю статистику та синхронізує
                                дані
                            </p>
                            <button
                                className="btn btn-info"
                                onClick={loadStats}
                                disabled={loading}
                            >
                                {loading ? 'Оновлення...' : '🔄 Оновити'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MigrationModal
                isOpen={showMigrationModal}
                onClose={() => setShowMigrationModal(false)}
                onComplete={handleMigrationComplete}
            />
        </div>
    );
};

export default AdminDashboardHome;
