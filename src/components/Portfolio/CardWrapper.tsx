import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
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
    // Фільтруємо картки по ролі
    console.log('Selected Role:', selectedRole);
    const filteredByRoleCards = getFilteredRoles(cards, selectedRole);
    // Отримуємо унікальні роки
    const uniqueYears = getFilteredYears(filteredByRoleCards);

    // Фільтруємо картки по ролі, року і часу
    const filteredCards = filteredByRoleCards
        .filter((card) => {
            const matchesYear =
                !selectedYear || Number(card.year) === Number(selectedYear);

            return matchesYear;
        })
        .sort((a, b) => Number(b.year) - Number(a.year));

    // Відкриття модалки
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
                </>
            )}
        </div>
    );
};

export default CardWrapper;
