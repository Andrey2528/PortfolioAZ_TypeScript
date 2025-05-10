import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import IPortfolioCardFull from '@/types';
import Card from '@/shared/components/Card/Card';
import Modal from '@/shared/components/Modal/Modal';
import modalConfig from '@/shared/components/Modal/modalConfig';
import { getUniqueCompanies } from '@/components/Portfolio/filter';
import { fetchSertificateCards } from '@/api/connectDB/databasefetch';

const SertificateWrapper = () => {
    const { t } = useTranslation();
    const [sertificates, setSertificates] = useState<IPortfolioCardFull[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [selectedCompany, setSelectedCompany] = useState<string>('');

    useEffect(() => {
        const getSertificates = async () => {
            const data = await fetchSertificateCards();
            setSertificates(data);
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
    };

    const filteredAndSortedCertificates = sertificates
        .filter((cert) => {
            return !selectedCompany || cert.company === selectedCompany;
        })
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    const uniqueCompany = getUniqueCompanies(sertificates, t);

    const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(e.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="filter__container">
                    <div className="filter__group">
                        <label htmlFor="roleFilter" className="filter__label">
                            {t('filter.company')}
                        </label>
                        <select
                            id="roleFilter"
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
                    <button onClick={resetFilters} className="filter__reset">
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
        </>
    );
};
export default SertificateWrapper;
