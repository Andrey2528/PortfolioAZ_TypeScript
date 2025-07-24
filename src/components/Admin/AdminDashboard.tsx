import React, { useState, useEffect } from 'react';
import { fetchPortfolioCards } from '../../api/connectDB/adminAPI';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import PortfolioForm from './PortfolioForm';
import PortfolioList from './PortfolioList';
import TranslationsManager from './TranslationsManager';
import CertificatesManager from './CertificatesManager';
import SkillsManager from './SkillsManager';
import SocialLinksManager from './SocialLinksManager';
import ProjectsQuickView from './ProjectsQuickView';
import DataSeedingStatus from './DataSeedingStatus';
import { seedInitialData, seedPortfolioData } from '../../utils/seedData';
import { migratePortfolioIds } from '../../utils/migrateIds';

const AdminDashboard: React.FC = () => {
    const [portfolioCards, setPortfolioCards] = useState<IPortfolioCardFull[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<
        'portfolio' | 'translations' | 'certificates' | 'skills' | 'social'
    >('portfolio');
    const [portfolioSubTab, setPortfolioSubTab] = useState<
        'list' | 'add' | 'edit'
    >('list');
    const [editingCard, setEditingCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        loadPortfolioCards();
    }, []);

    const loadPortfolioCards = async () => {
        setLoading(true);
        try {
            const cards = await fetchPortfolioCards();
            setPortfolioCards(cards);
        } catch (error) {
            console.error('Error loading portfolio cards:', error);
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
                loadPortfolioCards();
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
                loadPortfolioCards();
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

    const handleMigrateIds = async () => {
        if (
            !confirm(
                'Ви впевнені, що хочете мігрувати ID проектів на числові? Це замінить всі існуючі ID.',
            )
        ) {
            return;
        }

        setSeeding(true);
        try {
            const result = await migratePortfolioIds();
            if (result.success) {
                alert(result.message);
                loadPortfolioCards();
            } else {
                alert(
                    'Помилка міграції: ' + (result.error || 'Невідома помилка'),
                );
            }
        } catch (error) {
            console.error('Error migrating IDs:', error);
            alert('Помилка міграції ID');
        } finally {
            setSeeding(false);
        }
    };

    const handleAddSuccess = () => {
        loadPortfolioCards();
        setPortfolioSubTab('list');
    };

    const handleEditSuccess = () => {
        loadPortfolioCards();
        setPortfolioSubTab('list');
        setEditingCard(null);
    };

    const handleEdit = (card: IPortfolioCardFull) => {
        setEditingCard(card);
        setPortfolioSubTab('edit');
    };

    const handleCancelEdit = () => {
        setEditingCard(null);
        setPortfolioSubTab('list');
    };

    const handleSelectProjectFromQuickView = (card: IPortfolioCardFull) => {
        setActiveTab('portfolio');
        setEditingCard(card);
        setPortfolioSubTab('edit');
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Админ-панель портфолио</h1>
                <div className="admin-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={handleSeedData}
                        disabled={seeding}
                    >
                        {seeding
                            ? 'Завантаження...'
                            : '🌱 Завантажити всі дані'}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSeedPortfolio}
                        disabled={seeding}
                    >
                        {seeding
                            ? 'Завантаження...'
                            : '💼 Завантажити портфоліо'}
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={handleMigrateIds}
                        disabled={seeding}
                    >
                        {seeding ? 'Міграція...' : '🔄 Мігрувати ID'}
                    </button>
                </div>
                <div className="admin-nav">
                    <button
                        className={activeTab === 'portfolio' ? 'active' : ''}
                        onClick={() => setActiveTab('portfolio')}
                    >
                        Портфолио
                    </button>
                    <button
                        className={activeTab === 'translations' ? 'active' : ''}
                        onClick={() => setActiveTab('translations')}
                    >
                        Переводы
                    </button>
                    <button
                        className={activeTab === 'certificates' ? 'active' : ''}
                        onClick={() => setActiveTab('certificates')}
                    >
                        Сертификаты
                    </button>
                    <button
                        className={activeTab === 'skills' ? 'active' : ''}
                        onClick={() => setActiveTab('skills')}
                    >
                        Навыки
                    </button>
                    <button
                        className={activeTab === 'social' ? 'active' : ''}
                        onClick={() => setActiveTab('social')}
                    >
                        Соц. сети
                    </button>
                </div>
            </header>

            <main className="admin-content">
                <DataSeedingStatus />

                {activeTab === 'portfolio' && (
                    <>
                        <div className="portfolio-nav">
                            <button
                                className={
                                    portfolioSubTab === 'list' ? 'active' : ''
                                }
                                onClick={() => setPortfolioSubTab('list')}
                            >
                                Список работ ({portfolioCards.length})
                            </button>
                            <button
                                className={
                                    portfolioSubTab === 'add' ? 'active' : ''
                                }
                                onClick={() => setPortfolioSubTab('add')}
                            >
                                Добавить работу
                            </button>
                            <button
                                className="btn btn-primary btn-small"
                                onClick={handleSeedPortfolio}
                                disabled={seeding}
                            >
                                {seeding ? '⏳' : '💼'} Завантажити портфоліо
                            </button>
                        </div>

                        {portfolioSubTab === 'list' && (
                            <PortfolioList
                                cards={portfolioCards}
                                onEdit={handleEdit}
                                onRefresh={loadPortfolioCards}
                            />
                        )}

                        {portfolioSubTab === 'add' && (
                            <PortfolioForm
                                onSuccess={handleAddSuccess}
                                onCancel={() => setPortfolioSubTab('list')}
                            />
                        )}

                        {portfolioSubTab === 'edit' && editingCard && (
                            <PortfolioForm
                                editingCard={editingCard}
                                onSuccess={handleEditSuccess}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </>
                )}

                {activeTab === 'translations' && <TranslationsManager />}

                {activeTab === 'certificates' && <CertificatesManager />}

                {activeTab === 'skills' && <SkillsManager />}

                {activeTab === 'social' && <SocialLinksManager />}
            </main>

            {/* Швидкий перегляд проектів */}
            <ProjectsQuickView
                cards={portfolioCards}
                onSelectProject={handleSelectProjectFromQuickView}
            />
        </div>
    );
};

export default AdminDashboard;
