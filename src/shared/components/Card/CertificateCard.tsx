import { useTranslation } from 'react-i18next';
import '@/shared/styles/index.scss';
import { useState } from 'react';
import placeholderImg from '../../../assets/placeholder.jpg';
import { INormalizedCertificate } from '@/shared/interface/Certificate.interface';

interface ICertificateCardProps {
    card: INormalizedCertificate;
    openModal: (card: INormalizedCertificate) => void;
}

const CertificateCard: React.FC<ICertificateCardProps> = ({
    card,
    openModal,
}) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        openModal(card);
    };

    return (
        <div
            id={String(card.id)}
            //className={`card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <h3 className="card__title">{t(card.title)}</h3>
            <div className="card__row">
                <p className="card__desc">{t(card.subTitle)}</p>
                <span className="card__number card__desc">
                    {String(card.id)}
                </span>
            </div>
            <div className="card__miniature">
                <img
                    src={card.img || placeholderImg}
                    alt={t(card.title)}
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

export default CertificateCard;
