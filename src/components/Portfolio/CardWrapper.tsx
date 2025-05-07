import { useState } from 'react';
import Modal from '@/shared/components/Modal/Modal';
import Card from '@/shared/components/Card/Card';
import portfolioCard from '@/api/db/portfolioCardDB';
import { IPortfolioCardFull } from './types';
import { useTranslation } from 'react-i18next';

interface ModalFieldConfig<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'link' | 'list';
    transform?: (value: any) => string;
}

const CardWrapper = () => {
    const { t } = useTranslation();
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [timeFilter, setTimeFilter] = useState<string>('');

    const resetFilters = () => {
        setSelectedRole([]);
        setSelectedYear('');
        setTimeFilter('');
    };

    // Унікальні ролі для фільтра
    const uniqueRoles = Array.from(
        new Set(
            portfolioCard.flatMap((card) =>
                card.role.split(',').map((role) => role.trim()),
            ),
        ),
    );

    // Унікальні роки для фільтра
    const uniqueYears = Array.from(
        new Set(portfolioCard.map((card) => card.year)),
    ).sort((a, b) => b - a);

    // Опції для фільтра timeToEndWork
    const timeOptions = [
        { value: '', label: t('filter.all') },
        { value: '10', label: t('filter.timeLessThan10') },
        { value: '20', label: t('filter.timeLessThan20') },
        { value: '50', label: t('filter.timeLessThan50') },
        { value: '100', label: t('filter.timeLessThan100') },
    ];

    // Фільтрація та сортування карток
    const filteredCards = portfolioCard
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

    const modalConfig: ModalFieldConfig<IPortfolioCardFull>[] = [
        { key: 'id', label: 'modal.ID', type: 'text' },
        { key: 'year', label: 'modal.Year', type: 'text' },
        { key: 'design', label: 'modal.Design', type: 'text' },
        { key: 'role', label: 'modal.Role', type: 'list' },
        { key: 'tag', label: 'modal.Tags', type: 'list' },
        { key: 'platform', label: 'modal.Platform', type: 'text' },
        { key: 'type', label: 'modal.Type', type: 'text' },
        {
            key: 'url',
            label: 'modal.URL',
            type: 'link',
            transform: (value: string) =>
                value && value !== 'portfolioCard.urlNotAviable' ? value : null,
        },
        { key: 'description', label: 'modal.description', type: 'text' },
        {
            key: 'timeToEndWork',
            label: 'portfolioCard.timeWork.title',
            type: 'text',
        },
    ];

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
