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
            if (target.classList.contains('modal-overlay')) {
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

    return (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
                <button className="modal__close" onClick={onClose}>
                    ✕
                </button>

                <div className="modal__header">
                    <h2 className="modal__title">{t(card.title)}</h2>
                </div>

                <div className="modal__body">
                    <div className="modal__image-container">
                        <img
                            src={card.img || placeholderImg}
                            alt={t(card.title)}
                            className="modal__image"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = placeholderImg;
                            }}
                        />
                    </div>

                    <div className="modal__info">
                        <div className="modal__field">
                            <span className="modal__label">
                                {t('modal.ID')}:
                            </span>
                            <span className="modal__value">{card.id}</span>
                        </div>

                        <div className="modal__field">
                            <span className="modal__label">
                                {t('modal.company')}:
                            </span>
                            <span className="modal__value">{card.company}</span>
                        </div>

                        <div className="modal__field">
                            <span className="modal__label">
                                {t('modal.date')}:
                            </span>
                            <span className="modal__value">{card.date}</span>
                        </div>

                        <div className="modal__field">
                            <span className="modal__label">
                                {t('modal.description')}:
                            </span>
                            <span className="modal__value">
                                {t(card.subTitle)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
