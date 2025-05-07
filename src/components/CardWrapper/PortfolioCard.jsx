import '@/styles/index.scss';
import { useState } from 'react';

const PortfolioCard = ({ id, title, subTitle, number, img, openModal }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        openModal();
    };

    return (
        <div
            id={id}
            className={`card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <h3 className="card__title">{title}</h3>
            <div className="card__row">
                <p className="card__desc">{subTitle}</p>
                <span className="card__number card__desc">{number}</span>
            </div>
            <div className="card__miniature">
                <img src={img} alt="" className="card__img" />
            </div>
        </div>
    );
};

export default PortfolioCard;
