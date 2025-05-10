import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/shared/components/Modal/Modal';
import Card from '@/shared/components/Card/Card';
//import portfolioCard from '@/api/db/portfolioCardDB';
import { IPortfolioCardFull } from './types';
import {
    getUniqueRoles,
    getUniqueYears,
    getTimeOptions,
} from '@/components/Portfolio/filter';
import modalConfig from '@/shared/components/Modal/modalConfig';

import { fetchPortfolioCards } from '@/api/connectDB/databasefetch';

const CardWrapper = () => {
    const { t } = useTranslation();
    const [cards, setCards] = useState<IPortfolioCardFull[]>([]);
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [timeFilter, setTimeFilter] = useState<string>('');

    useEffect(() => {
        const getCards = async () => {
            const data = await fetchPortfolioCards();
            setCards(data);
        };
        getCards();
    }, []);

    const resetFilters = () => {
        setSelectedRole('');
        setSelectedYear('');
        setTimeFilter('');
    };

    // Унікальні ролі для фільтра
    const uniqueRoles = getUniqueRoles(cards, t);

    // Унікальні роки для фільтра
    const uniqueYears = getUniqueYears(cards);

    // Опції для фільтра timeToEndWork
    const timeOptions = getTimeOptions(t);

    // Фільтрація та сортування карток
    const filteredCards = cards
        .filter((card) => {
            const roles = card.role.split(',').map((role) => role.trim());
            const matchesRole = !selectedRole || roles.includes(selectedRole);
            const matchesYear =
                !selectedYear || card.year === Number(selectedYear);
            const timeHours = parseInt(card.timeToEndWork) || 0;
            const matchesTime = !timeFilter || timeHours < parseInt(timeFilter);
            return matchesRole && matchesYear && matchesTime;
        })
        .sort((a, b) => b.year - a.year);

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

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFilter(e.target.value);
    };

    return (
        <div className="container">
            <div className="filter__container">
                <div className="filter__group">
                    <label htmlFor="roleFilter" className="filter__label">
                        {t('filter.role')}
                    </label>
                    <select
                        id="roleFilter"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="filter__select"
                    >
                        <option value="">{t('filter.all')}</option>
                        {uniqueRoles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter__group">
                    <label htmlFor="yearFilter" className="filter__label">
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
                <div className="filter__group">
                    <label htmlFor="timeFilter" className="filter__label">
                        {t('filter.time')}
                    </label>
                    <select
                        id="timeFilter"
                        value={timeFilter}
                        onChange={handleTimeChange}
                        className="filter__select"
                    >
                        {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={resetFilters} className="filter__reset">
                    {t('filter.reset')}
                </button>
            </div>
            <div className="card__list">
                {filteredCards.map((card) => (
                    <Card<IPortfolioCardFull>
                        key={card.id}
                        card={card}
                        openModal={openModal}
                        titleKey="title"
                        subTitleKey="subTitle"
                        imgKey="img"
                        idKey="id"
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
        </div>
    );
};

export default CardWrapper;
