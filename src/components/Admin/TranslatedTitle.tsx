import React from 'react';
import { useTranslation } from 'react-i18next';

interface TranslatedTitleProps {
    titleKey: string;
    fallback?: string;
    className?: string;
    showKey?: boolean;
    keyStyle?: React.CSSProperties;
}

const TranslatedTitle: React.FC<TranslatedTitleProps> = ({
    titleKey,
    fallback,
    className,
    showKey = true,
    keyStyle,
}) => {
    const { t } = useTranslation();

    // Отримуємо переклад, якщо він існує
    const translatedTitle = t(titleKey, { defaultValue: fallback || titleKey });

    return (
        <span className={className} title={`Ключ: ${titleKey}`}>
            {translatedTitle}
            {/* Показуємо ключ в дужках для розробника */}
            {showKey && (
                <small
                    style={{
                        color: '#666',
                        marginLeft: '8px',
                        fontSize: '0.8em',
                        opacity: 0.7,
                        ...keyStyle,
                    }}
                >
                    ({titleKey})
                </small>
            )}
        </span>
    );
};

export default TranslatedTitle;
