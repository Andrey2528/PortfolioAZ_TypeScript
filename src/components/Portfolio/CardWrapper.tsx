import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import i18n from '@/i18n';
import Modal from '@/shared/components/Modal/Modal';
import Card from '@/shared/components/Card/Card';
import { IPortfolioCardFull } from '@/utils/interface/interfaceCard';
import {
    getFilteredRoles,
    getFilteredYears,
    getRoles,
} from '@/components/Portfolio/filter';
import modalConfig from '@/shared/components/Modal/modalConfig';
import { fetchPortfolioCards } from '@/api/connectDB/databaseFetch';
import { normalizeDBData } from '@/api/connectDB/normalizeDBData';
import Loader from '../Loader/Loader';

const tEn = i18n.getFixedT('en');

const CardWrapper = () => {
    const { t } = useTranslation();
    const [cards, setCards] = useState<IPortfolioCardFull[]>([]);
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set()); // Відстежуємо видимі картки

    const observerRef = useRef<IntersectionObserver | null>(null);

    // Отримуємо картки
    useEffect(() => {
        const getCards = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPortfolioCards();
                const normalizedData = normalizeDBData(data, tEn);
                setCards(normalizedData);
            } catch (error) {
                console.error('Error fetching cards:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getCards();
    }, []);

    const resetFilters = () => {
        setSelectedRole('');
        setSelectedYear('');
    };

    // Отримуємо ролі для селекту
    const roles = getRoles(t);
    const filteredByRoleCards = getFilteredRoles(cards, selectedRole);
    const uniqueYears = getFilteredYears(filteredByRoleCards);

    const filteredCards = filteredByRoleCards
        .filter((card) => {
            const matchesYear =
                !selectedYear || Number(card.year) === Number(selectedYear);

            return matchesYear;
        })
        .sort((a, b) => Number(b.year) - Number(a.year));

    // Intersection Observer для відстеження видимості елементів
    useEffect(() => {
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
            { threshold: 0.1 }, // Елемент вважається видимим, якщо 10% його площі у видимій області
        );

        observerRef.current = observer;

        return () => {
            observer.disconnect();
        };
    }, []);

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

    return (
        <div className="container">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="filter__container">
                        {/* Фільтр за роллю */}
                        <div className="filter__group">
                            <label
                                htmlFor="roleFilter"
                                className="filter__label"
                            >
                                {t('filter.role')}
                            </label>
                            <select
                                id="roleFilter"
                                value={selectedRole}
                                onChange={handleRoleChange}
                                className="filter__select"
                            >
                                <option value="">{t('filter.all')}</option>
                                {roles.map((role) => (
                                    <option key={role.key} value={role.key}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Фільтр за роком */}
                        <div className="filter__group">
                            <label
                                htmlFor="yearFilter"
                                className="filter__label"
                            >
                                {t('filter.year')}
                            </label>
                            <select
                                id="yearFilter"
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="filter__select"
                            >
                                <option value="">{t('filter.all')}</option>
                                {uniqueYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Кнопка скидання фільтрів */}
                        <button
                            onClick={resetFilters}
                            className="filter__reset"
                        >
                            {t('filter.reset')}
                        </button>
                    </div>

                    <div className="card__list">
                        {filteredCards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                className="card"
                                data-index={index} // Додаємо індекс для відстеження
                                ref={(el) => {
                                    if (el && observerRef.current) {
                                        observerRef.current.observe(el);
                                    }
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={
                                    visibleCards.has(index)
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 50 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <Card<IPortfolioCardFull>
                                    card={card}
                                    openModal={openModal}
                                    titleKey="title"
                                    subTitleKey="subTitle"
                                    imgKey="img"
                                    idKey="id"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {selectedCard && isModalOpen && (
                        <motion.div
                            className="modal-overlay" // Клас для стилізації фону модального вікна
                            initial={{ opacity: 0 }} // Початковий стан (прозорий фон)
                            animate={{ opacity: 1 }} // Кінцевий стан (видимий фон)
                            exit={{ opacity: 0 }} // Стан при закритті (знову прозорий)
                            transition={{ duration: 0.3 }} // Тривалість анімації
                        >
                            <motion.div
                                className="modal-content" // Клас для стилізації контенту модального вікна
                                initial={{ opacity: 0, scale: 0.8 }} // Початковий стан (зменшений і прозорий)
                                animate={{ opacity: 1, scale: 1 }} // Кінцевий стан (повний розмір і видимий)
                                exit={{ opacity: 0, scale: 0.8 }} // Стан при закритті (зменшений і прозорий)
                                transition={{ duration: 0.3 }} // Тривалість анімації
                            >
                                <Modal<IPortfolioCardFull>
                                    card={selectedCard}
                                    onClose={closeModal}
                                    config={modalConfig}
                                    titleKey="title"
                                    subTitleKey="subTitle"
                                    imgKey="img"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default CardWrapper;
