import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { IPortfolioCardFull } from '@/utils/interface/interfaceCard';
import Card from '@/shared/components/Card/Card';
import Modal from '@/shared/components/Modal/Modal';
import modalConfig from '@/shared/components/Modal/modalConfig';
import { getFilteredCompanies } from '@/components/Portfolio/filter';
import { fetchSertificateCards } from '@/api/connectDB/databaseFetch';
import Loader from '../Loader/Loader';

const SertificateWrapper = () => {
    const { t } = useTranslation();
    const [sertificates, setSertificates] = useState<IPortfolioCardFull[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('id-asc'); // Додано стан для сортування
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getSertificates = async () => {
            setIsLoading(true);
            const data = await fetchSertificateCards();
            setSertificates(data);
            setIsLoading(false);
        };
        getSertificates();
    }, []);

    const openModal = (card: IPortfolioCardFull) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    const resetFilters = () => {
        setSelectedCompany('');
        setSortOption('id-asc');
    };

    const filteredAndSortedCertificates = sertificates
        .filter((cert) => {
            return !selectedCompany || cert.company === selectedCompany;
        })
        .sort((a, b) => {
            const [key, order] = sortOption.split('-'); // Розділяємо ключ і порядок (asc/desc)
            let comparison = 0;

            if (key === 'name') {
                comparison = a.title.localeCompare(b.title); // Сортування за назвою
            } else {
                comparison = Number(a.id) - Number(b.id); // Сортування за ID
            }

            return order === 'asc' ? comparison : -comparison; // Змінюємо порядок сортування
        });

    const uniqueCompany = getFilteredCompanies(sertificates, t);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container">
                    <div className="filter__container">
                        <div className="filter__group">
                            <label
                                htmlFor="companyFilter"
                                className="filter__label"
                            >
                                {t('filter.company')}
                            </label>
                            <select
                                id="companyFilter"
                                value={selectedCompany}
                                onChange={handleCompanyChange}
                                className="filter__select"
                            >
                                <option value="">{t('filter.all')}</option>
                                {uniqueCompany.map((company) => (
                                    <option key={company} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter__group">
                            <label
                                htmlFor="sortFilter"
                                className="filter__label"
                            >
                                {t('filter.sort')}
                            </label>
                            <select
                                id="sortFilter"
                                value={sortOption}
                                onChange={handleSortChange}
                                className="filter__select"
                            >
                                <option value="id-asc">
                                    {t('filter.sortByIdAsc')}
                                </option>
                                <option value="id-desc">
                                    {t('filter.sortByIdDesc')}
                                </option>

                                <option value="name-asc">
                                    {t('filter.sortByNameAsc')}
                                </option>
                                <option value="name-desc">
                                    {t('filter.sortByNameDesc')}
                                </option>
                            </select>
                        </div>

                        <button
                            onClick={resetFilters}
                            className="filter__reset"
                        >
                            {t('filter.reset')}
                        </button>
                    </div>
                    <div className="card__list">
                        {filteredAndSortedCertificates.map((card) => (
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
            )}
        </>
    );
};
export default SertificateWrapper;
