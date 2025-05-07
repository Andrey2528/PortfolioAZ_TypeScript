import '@/styles/index.scss';
import { useState } from 'react';

interface ICardProps<T> {
    card: T;
    openModal: (card: T) => void;
    titleKey: keyof T;
    subTitleKey: keyof T;
    imgKey: keyof T;
    idKey: keyof T;
}

const Card = <T,>({
    card,
    openModal,
    titleKey,
    subTitleKey,
    imgKey,
    idKey,
}: ICardProps<T>) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        openModal(card);
    };

    return (
        <div
            id={String(card[idKey])}
            className={`card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <h3 className="card__title">{String(card[titleKey])}</h3>
            <div className="card__row">
                <p className="card__desc">{String(card[subTitleKey])}</p>
                <span className="card__number card__desc">
                    {String(card[idKey])}
                </span>
            </div>
            <div className="card__miniature">
                <img
                    src={String(card[imgKey])}
                    alt={String(card[titleKey])}
                    className="card__img"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default Card;
