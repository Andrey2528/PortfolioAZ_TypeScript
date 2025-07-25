import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import i18n from '@/utils/i18n';
import Modal from '@/shared/components/Modal/Modal';
import RenderCard from '@/shared/components/Card/RenderCard';
import { IPortfolioCardFull } from '@/shared/interface/interfaceCard';
import {
    getFilteredRoles,
    getFilteredYears,
    getRoles,
} from '@/shared/config/filterConfig';
import modalConfig from '@/shared/components/Modal/modalConfig';
import {
    fetchPortfolioData,
    normalizePortfolioData,
} from '@/utils/firebaseAPI';
import Loader from '../../shared/components/Loader/Loader';
import {
    animationModalOverlayProps,
    animationModalContentProps,
} from '@/shared/config/animationConfig';
import Filters from './filterContainer';

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
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

    const observerRef = useRef<IntersectionObserver | null>(null);

    // Завантаження карток
    const getCards = async () => {
        try {
            setIsLoading(true);
            const data = await fetchPortfolioData();
            const normalizedData = normalizePortfolioData(data);
            setCards(normalizedData);
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCards();
    }, []);

    // Фільтрація карток
    const getFilteredCards = () => {
        const filteredByRoleCards = getFilteredRoles(cards, selectedRole);
        const filteredByYearCards = filteredByRoleCards.filter((card) =>
            selectedYear ? Number(card.year) === Number(selectedYear) : true,
        );
        return filteredByYearCards.sort(
            (a, b) => Number(b.year) - Number(a.year),
        );
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

    const resetFilters = () => {
        setSelectedRole('');
        setSelectedYear('');
    };

    return (
        <div className="container">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Filters
                        roles={roles}
                        uniqueYears={uniqueYears}
                        selectedRole={selectedRole}
                        selectedYear={selectedYear}
                        onRoleChange={handleRoleChange}
                        onYearChange={handleYearChange}
                        onReset={resetFilters}
                    />

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
                        <motion.div
                            className="modal-overlay"
                            {...animationModalOverlayProps}
                        >
                            <motion.div
                                className="modal-content"
                                {...animationModalContentProps}
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
