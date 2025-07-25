import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { IPortfolioCardFull } from '@/shared/interface/interfaceCard';
import Card from '@/shared/components/Card/Card';
import Modal from '@/shared/components/Modal/Modal';
import modalConfig from '@/shared/components/Modal/modalConfig';
import { getFilteredCompanies } from '@/shared/config/filterConfig';
import {
    fetchCertificatesData,
    normalizeCertificatesData,
} from '@/utils/firebaseAPI';
import Loader from '../../shared/components/Loader/Loader';

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
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set()); // Відстежуємо видимі картки

    useEffect(() => {
        const getSertificates = async () => {
            setIsLoading(true);
            const data = await fetchCertificatesData();
            const normalizedData = normalizeCertificatesData(data);
            setSertificates(normalizedData);
            setIsLoading(false);
        };
        getSertificates();
    }, []);
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
                        {filteredAndSortedCertificates.map((card, index) => (
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
                </div>
            )}
        </>
    );
};
export default SertificateWrapper;
