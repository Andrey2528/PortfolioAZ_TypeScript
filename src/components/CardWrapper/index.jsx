import { useState } from 'react';
import Modal from '@/shared/components/CardModal';
import PortfolioCard from './PortfolioCard';
import { portfolioCard } from '@/api/db/portfolioCard';

const CardWrapper = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const sortedCards = portfolioCard.sort((a, b) => b.year - a.year);

    const openModal = (card) => {
        setSelectedCard(card);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <div className="container">
            <div className="card__list">
                {sortedCards.map((card) => (
                    <PortfolioCard
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        subTitle={card.subTitle}
                        number={card.id}
                        img={card.img}
                        year={card.year}
                        design={card.design}
                        role={card.role}
                        tag={card.tag}
                        platform={card.platform}
                        type={card.type}
                        url={card.url}
                        description={card.description}
                        timeToEndWork={card.timeToEndWork}
                        openModal={() => openModal(card)}
                    />
                ))}
            </div>
            {selectedCard && <Modal card={selectedCard} onClose={closeModal} />}
        </div>
    );
};

export default CardWrapper;
