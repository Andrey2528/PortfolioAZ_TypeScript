import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import placeholderImg from '../../../assets/placeholder.jpg';
import { IModalProps, IModalField } from '@/shared/interface/Modal.interface';

import '@/shared/styles/index.scss';

const Modal = <T,>({
    card,
    onClose,
    config = [],
    titleKey,
    subTitleKey,
    imgKey,
}: IModalProps<T>) => {
    const { t } = useTranslation();
    if (!card) return null;

    const renderList = (items: string[], className: string) =>
        items.length > 0 ? (
            <ul className={className}>
                {items.map((item, index) => (
                    <li key={index} className="modal__item">
                        <p className="modal__list navbar__nav__link">
                            {t(item)}
                        </p>
                    </li>
                ))}
            </ul>
        ) : null;

    const renderField = (field: IModalField<T>) => {
        const value = card[field.key];
        if (!value) return null;

        if (field.type === 'link') {
            return (
                <a
                    href={String(value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__nav__link modal__link"
                >
                    {t(String(value))}
                </a>
            );
        } else if (field.type === 'list' && typeof value === 'string') {
            const items = value.split(',').map((item) => item.trim());
            return renderList(items, 'modal__list');
        } else if (field.key === 'timeToEndWork' && typeof value === 'object') {
            return (
                <span>
                    {value.value} {t(value.unit)}
                </span>
            );
        } else if (field.transform) {
            return field.transform(value);
        }
        return t(String(value));
    };

    useEffect(() => {
        document.body.classList.add('body-lock');
        return () => document.body.classList.remove('body-lock');
    }, []);

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target.classList.contains('modal')) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal__content">
                <img
                    src={String(card[imgKey])}
                    alt={String(card[titleKey])}
                    className="modal__img"
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevents looping
                        target.src = placeholderImg; // fallback image
                    }}
                />
                <div className="modal__column">
                    <button className="modal__close" onClick={onClose}>
                        <span></span>
                    </button>
                    <h2 className="modal__title card__title">
                        {t(String(card[titleKey]))}
                    </h2>
                    <p className="modal__desc card__desc">
                        {t(String(card[subTitleKey]))}
                    </p>
                    {config.map((field, index) => {
                        const value = renderField(field);
                        if (!value) return null;
                        return (
                            <div key={index} className="modal__row-border">
                                <p className="card__number card__desc alignCenter">
                                    {t(field.label)}:{' '}
                                </p>
                                <div className="navbar__nav__link">{value}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Modal;
