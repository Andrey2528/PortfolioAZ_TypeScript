import { useState } from 'react';
import Modal from '@/shared/components/Modal/Modal';
import Card from '@/shared/components/Card/Card';
import portfolioCard from '@/api/db/portfolioCardDB';
import { IPortfolioCardFull } from './types';

const CardWrapper = () => {
    const [selectedCard, setSelectedCard] = useState<IPortfolioCardFull | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Створюємо копію масиву і сортуємо за роком у спадному порядку
    const sortedCards: IPortfolioCardFull[] = [...portfolioCard].sort(
        (a, b) => b.year - a.year,
    );

    const openModal = (card: IPortfolioCardFull) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    const modalConfig: ModalFieldConfig<IPortfolioCardFull>[] = [
        { key: 'id', label: 'modal.ID', type: 'text' },
        { key: 'year', label: 'modal.Year', type: 'text' },
        { key: 'design', label: 'modal.Design', type: 'text' },
        {
            key: 'role',
            label: 'modal.Role',
            type: 'list',
        },
        { key: 'tag', label: 'modal.Tags', type: 'text' },
        { key: 'platform', label: 'modal.Platform', type: 'text' },
        { key: 'type', label: 'modal.Type', type: 'text' },
        { key: 'url', label: 'modal.URL', type: 'link' },
        { key: 'description', label: 'modal.description', type: 'text' },
        {
            key: 'timeToEndWork',
            label: 'portfolioCard.timeWork.title',
            type: 'text',
        },
    ];

    return (
        <div className="container">
            <div className="card__list">
                {sortedCards.map((card) => (
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
