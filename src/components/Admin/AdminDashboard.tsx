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
import MigrationModal from './MigrationModal';
import AdminDashboardHome from './AdminDashboardHome';
import '../../shared/styles/components/Admin/AdminDashboard.scss';

const AdminDashboard: React.FC = () => {
    const [portfolioCards, setPortfolioCards] = useState<IPortfolioCardFull[]>(
        [],
    );
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<
        | 'home'
        | 'portfolio'
        | 'translations'
        | 'certificates'
        | 'skills'
        | 'social'
    >('home');
    const [portfolioSubTab, setPortfolioSubTab] = useState<
        'list' | 'add' | 'edit'
    >('list');
    const [editingCard, setEditingCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [showMigrationModal, setShowMigrationModal] = useState(false);

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

    const handleMigrateIds = () => {
        setShowMigrationModal(true);
    };

    const handleMigrationComplete = () => {
        loadPortfolioCards();
        setShowMigrationModal(false);
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
                <div className="admin-nav">
                    <button
                        className={activeTab === 'home' ? 'active' : ''}
                        onClick={() => setActiveTab('home')}
                    >
                        🏠 Головна
                    </button>
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
                {activeTab === 'home' && (
                    <AdminDashboardHome onRefreshData={loadPortfolioCards} />
                )}

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

            {/* Модальне вікно міграції */}
            <MigrationModal
                isOpen={showMigrationModal}
                onClose={() => setShowMigrationModal(false)}
                onComplete={handleMigrationComplete}
            />
        </div>
    );
};

export default AdminDashboard;
