import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import i18n from '@/utils/i18nWithFirebase';
import Modal from '@/shared/components/Modal/Modal';
import RenderCard from '@/shared/components/Card/RenderCard';
import { IPortfolioCardFull } from '@/shared/interface/Card.interface';
import {
    getFilteredRoles,
    getFilteredYears,
    getRoles,
} from '@/shared/config/filter.config';
import modalConfig from '@/shared/config/modal.config';
import {
    fetchPortfolioData,
    normalizePortfolioData,
} from '@/utils/firebaseAPI';
import Loader from '../../shared/components/Loader/Loader';
import Filters from './filterContainer';

const tEn = i18n.getFixedT('en');

const CardWrapper = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [cards, setCards] = useState<IPortfolioCardFull[]>([]);
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('id-desc'); // ID по убыванию по умолчанию
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    // Отримуємо компанію з URL параметрів
    const companyFromUrl = searchParams.get('company');

    useEffect(() => {}, [cards]);

    const observerRef = useRef<IntersectionObserver | null>(null);

    // Завантаження карток
    const getCards = async () => {
        try {
            setIsLoading(true);
            const data = await fetchPortfolioData();
            const normalizedData = normalizePortfolioData(data);
            setCards(normalizedData);
        } catch (error) {
            console.error('CardWrapper: Error fetching cards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCards();
    }, []);

    // Фільтрація та сортування карток
    const getFilteredCards = () => {
        const filteredByRoleCards = getFilteredRoles(cards, selectedRole);

        const filteredByYearCards = filteredByRoleCards.filter((card) =>
            selectedYear ? Number(card.year) === Number(selectedYear) : true,
        );

        // Фільтрація за компанією з URL
        const filteredByCompanyCards = companyFromUrl
            ? filteredByYearCards.filter(
                  (card) => card.company === companyFromUrl,
              )
            : filteredByYearCards;

        // Сортування в залежності від вибраної опції
        const sortedCards = filteredByCompanyCards.sort((a, b) => {
            const [key, order] = sortOption.split('-');
            let comparison = 0;

            if (key === 'id') {
                // Сравниваем ID как числа, если возможно, иначе как строки
                const aId = isNaN(Number(a.id)) ? a.id : Number(a.id);
                const bId = isNaN(Number(b.id)) ? b.id : Number(b.id);

                if (typeof aId === 'number' && typeof bId === 'number') {
                    comparison = aId - bId;
                } else {
                    comparison = String(aId).localeCompare(String(bId));
                }
            } else if (key === 'year') {
                comparison = Number(a.year) - Number(b.year);
            } else if (key === 'name') {
                comparison = a.title.localeCompare(b.title);
            }

            return order === 'asc' ? comparison : -comparison;
        });

        return sortedCards;
    };

    const filteredCards = getFilteredCards();
    const roles = getRoles(t);
    const uniqueYears = getFilteredYears(filteredCards);

    // Intersection Observer
    useEffect(() => {
        if (observerRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(
                            entry.target.getAttribute('data-index'),
                        );
                        setVisibleCards((prev) => new Set(prev).add(index));
                    }
                });
            },
            { threshold: 0.1 },
        );

        observerRef.current = observer;

        return () => {
            observer.disconnect();
        };
    }, []);

    // Обробники подій
    const openModal = (card: IPortfolioCardFull) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const resetFilters = () => {
        setSelectedRole('');
        setSelectedYear('');
        setSortOption('id-desc'); // Возвращаем к ID по убыванию
    };

    return (
        <div className="container">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Filters
                        roles={roles}
                        uniqueYears={uniqueYears.map(String)}
                        selectedRole={selectedRole}
                        selectedYear={selectedYear}
                        selectedSort={sortOption}
                        onRoleChange={handleRoleChange}
                        onYearChange={handleYearChange}
                        onSortChange={handleSortChange}
                        onReset={resetFilters}
                    />

                    {companyFromUrl && (
                        <div
                            style={{
                                padding: '15px 20px',
                                margin: '20px 0',
                                background:
                                    'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                                borderRadius: '12px',
                                borderLeft: '4px solid #3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                            }}
                        >
                            <span style={{ fontSize: '1.3rem' }}>🔍</span>
                            <span>
                                Фільтр за компанією:{' '}
                                <strong>{companyFromUrl}</strong>
                            </span>
                            <button
                                onClick={() =>
                                    (window.location.href = '/portfolio')
                                }
                                style={{
                                    marginLeft: 'auto',
                                    padding: '6px 14px',
                                    background: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                }}
                            >
                                Скинути фільтр
                            </button>
                        </div>
                    )}

                    <div className="card__list">
                        {filteredCards.map((card, index) => (
                            <RenderCard
                                key={card.id}
                                card={card}
                                index={index}
                                observerRef={observerRef}
                                visibleCards={visibleCards}
                                openModal={openModal}
                            />
                        ))}
                    </div>

                    {selectedCard && isModalOpen && (
                        <Modal<IPortfolioCardFull>
                            card={selectedCard}
                            onClose={closeModal}
                            config={modalConfig}
                            titleKey="title"
                            subTitleKey="subTitle"
                            imgKey="img"
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CardWrapper;
