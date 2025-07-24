import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import { deletePortfolioCard } from '../../api/connectDB/adminAPI';
import TranslatedTitle from './TranslatedTitle';

interface PortfolioListProps {
    cards: IPortfolioCardFull[];
    onEdit: (card: IPortfolioCardFull) => void;
    onRefresh: () => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({
    cards,
    onEdit,
    onRefresh,
}) => {
    const { t } = useTranslation();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'title' | 'year' | 'company'>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleDelete = async (card: IPortfolioCardFull) => {
        const translatedTitle = t(card.title, { defaultValue: card.title });
        if (
            !window.confirm(
                `Вы уверены, что хотите удалить "${translatedTitle}" (${card.title})?`,
            )
        ) {
            return;
        }

        setDeletingId(card.id);

        try {
            await deletePortfolioCard(card.id);
            onRefresh();
        } catch (error) {
            console.error('Error deleting portfolio card:', error);
            alert('Ошибка при удалении. Попробуйте еще раз.');
        } finally {
            setDeletingId(null);
        }
    };

    const filteredCards = cards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.tag.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sortedCards = [...filteredCards].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortBy) {
            case 'year':
                aValue = a.year;
                bValue = b.year;
                break;
            case 'company':
                aValue = a.company.toLowerCase();
                bValue = b.company.toLowerCase();
                break;
            default:
                aValue = a.title.toLowerCase();
                bValue = b.title.toLowerCase();
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field: 'title' | 'year' | 'company') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field: 'title' | 'year' | 'company') => {
        if (sortBy !== field) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="portfolio-list">
            <div className="list-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Поиск по названию, компании, тегам..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="sort-controls">
                    <label>Сортировка:</label>
                    <button
                        className={sortBy === 'title' ? 'active' : ''}
                        onClick={() => handleSort('title')}
                    >
                        Название {getSortIcon('title')}
                    </button>
                    <button
                        className={sortBy === 'year' ? 'active' : ''}
                        onClick={() => handleSort('year')}
                    >
                        Год {getSortIcon('year')}
                    </button>
                    <button
                        className={sortBy === 'company' ? 'active' : ''}
                        onClick={() => handleSort('company')}
                    >
                        Компания {getSortIcon('company')}
                    </button>
                </div>
            </div>

            <div className="list-stats">
                Показано {sortedCards.length} из {cards.length} работ
            </div>

            <div className="cards-grid">
                {sortedCards.map((card) => (
                    <div key={card.id} className="card-item">
                        <div className="card-image">
                            <img src={card.img} alt={card.title} />
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <h3>
                                    <TranslatedTitle
                                        titleKey={card.title}
                                        fallback={card.title}
                                    />
                                </h3>
                                <div className="card-id">
                                    ID: {card.numericId || card.id}
                                </div>
                            </div>
                            <p className="subtitle">
                                <TranslatedTitle
                                    titleKey={card.subTitle}
                                    fallback={card.subTitle}
                                />
                            </p>

                            <div className="card-meta">
                                <span className="year">{card.year}</span>
                                <span className="company">{card.company}</span>
                                {card.tag && (
                                    <span className="tag">{card.tag}</span>
                                )}
                            </div>

                            {card.type &&
                                Array.isArray(card.type) &&
                                card.type.length > 0 && (
                                    <div className="card-types">
                                        {card.type.map((type, index) => (
                                            <span
                                                key={index}
                                                className="type-badge"
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            {card.type && !Array.isArray(card.type) && (
                                <div className="card-types">
                                    <span className="type-badge">
                                        {card.type}
                                    </span>
                                </div>
                            )}

                            <div className="card-description">
                                {card.description.length > 100
                                    ? `${card.description.substring(0, 100)}...`
                                    : card.description}
                            </div>

                            {card.url && (
                                <div className="card-url">
                                    <a
                                        href={card.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Открыть проект
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="card-actions">
                            <button
                                onClick={() => onEdit(card)}
                                className="edit-btn"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(card)}
                                disabled={deletingId === card.id}
                                className="delete-btn"
                            >
                                {deletingId === card.id
                                    ? 'Удаление...'
                                    : 'Удалить'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {sortedCards.length === 0 && (
                <div className="no-results">
                    {searchTerm
                        ? 'Ничего не найдено по вашему запросу'
                        : 'Нет работ для отображения'}
                </div>
            )}
        </div>
    );
};

export default PortfolioList;
