import '@/styles/index.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ onClose, card }) => {
    const { t } = useTranslation();
    if (!card) return null;

    const {
        id,
        title,
        subTitle,
        img,
        year,
        role,
        design,
        tag,
        platform,
        type,
        url,
        description,
        timeToEndWork,
    } = card;

    const renderList = (items, className) =>
        items.length > 0 ? (
            <ul className={className}>
                {items.map((item, index) => (
                    <li key={index} className="modal__item">
                        <p className="modal__list navbar__nav__link">{item}</p>
                    </li>
                ))}
            </ul>
        ) : null;

    const roleArray = role ? role.split(',').map((role) => role.trim()) : [];

    const details = [
        { label: t('modal.ID'), value: id },
        { label: t('modal.Year'), value: year },
        { label: t('modal.Design'), value: design },
        { label: t('modal.Role'), value: renderList(roleArray, 'modal__list') },
        { label: t('modal.Tags'), value: tag },

        { label: t('modal.Platform'), value: platform },
        { label: t('modal.Type'), value: type },
        url && {
            label: t('modal.URL'),
            value: (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__nav__link modal__link"
                >
                    {url}
                </a>
            ),
        },
        { label: t('modal.description'), value: description },
        { label: t('portfolioCard.timeWork.title'), value: timeToEndWork },
    ].filter(Boolean);

    useEffect(() => {
        document.body.classList.add('body-lock');
        return () => document.body.classList.remove('body-lock');
    }, []);

    const handleClose = (e) => {
        if (e.target.classList.contains('modal')) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal__content">
                <img src={img} alt={title} className="modal__img" />
                <div className="modal__column">
                    <button className="modal__close" onClick={onClose}>
                        <span></span>
                    </button>
                    <h2 className="modal__title card__title">{title}</h2>
                    <p className="modal__desc card__desc">{subTitle}</p>
                    {details.map(({ label, value }, index) => (
                        <div key={index} className="modal__row-border">
                            <p className="card__number card__desc alignCenter">
                                {label}:{' '}
                            </p>
                            <div className="navbar__nav__link">{value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
