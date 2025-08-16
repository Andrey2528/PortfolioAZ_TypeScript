import { useTranslation } from 'react-i18next';
import '@/shared/styles/index.scss';
import { useState } from 'react';
import placeholderImg from '../../../assets/placeholder.jpg';
import { ICardProps } from '@/shared/interface/Card.interface';

const Card = <T,>({
    card,
    openModal,
    titleKey,
    subTitleKey,
    imgKey,
    idKey,
}: ICardProps<T>) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        openModal(card);
    };

    return (
        <div
            id={String(card[idKey])}
            //className={`card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <h3 className="card__title">{t(String(card[titleKey]))}</h3>
            <div className="card__row">
                <p className="card__desc">{t(String(card[subTitleKey]))}</p>
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
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevents looping
                        target.src = placeholderImg; // fallback image
                    }}
                />
            </div>
        </div>
    );
};

export default Card;
