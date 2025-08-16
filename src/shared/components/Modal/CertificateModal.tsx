import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import placeholderImg from '../../../assets/placeholder.jpg';
import { INormalizedCertificate } from '@/shared/interface/Certificate.interface';
import '@/shared/styles/index.scss';

interface ICertificateModalProps {
    card: INormalizedCertificate | null;
    onClose: () => void;
}

const CertificateModal: React.FC<ICertificateModalProps> = ({
    card,
    onClose,
}) => {
    const { t } = useTranslation();

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('modal')) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    if (!card) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal__content" onClick={handleContentClick}>
                <button className="modal__close" onClick={onClose}>
                    <span>&times;</span>
                </button>

                <img
                    src={card.img || placeholderImg}
                    alt={t(card.title)}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = placeholderImg;
                    }}
                />

                <div className="modal__list">
                    <div className="modal__row-border">
                        <p className="card__number card__desc alignCenter">
                            {t('modal.ID')}:{' '}
                        </p>
                        <div className="navbar__nav__link">{card.id}</div>
                    </div>

                    <div className="modal__row-border">
                        <p className="card__number card__desc alignCenter">
                            {t('modal.company')}:{' '}
                        </p>
                        <div className="navbar__nav__link">{card.company}</div>
                    </div>

                    <div className="modal__row-border">
                        <p className="card__number card__desc alignCenter">
                            {t('modal.date')}:{' '}
                        </p>
                        <div className="navbar__nav__link">{card.date}</div>
                    </div>

                    <div className="modal__row-border">
                        <p className="card__number card__desc alignCenter">
                            {t('modal.description')}:{' '}
                        </p>
                        <div className="navbar__nav__link">
                            {t(card.subTitle)}
                        </div>
                    </div>

                    <div className="modal__row-border">
                        <p className="card__number card__desc alignCenter">
                            {t('modal.title')}:{' '}
                        </p>
                        <div className="navbar__nav__link">{t(card.title)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
