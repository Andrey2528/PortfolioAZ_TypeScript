import React from 'react';
import TranslatedTitle from './TranslatedTitle';

interface FieldPreviewProps {
    value: string;
    fieldName: string;
    isTranslationKey?: boolean;
}

const FieldPreview: React.FC<FieldPreviewProps> = ({
    value,
    fieldName,
    isTranslationKey = true,
}) => {
    if (!value || !value.trim()) return null;

    // Обробляємо поле часу роботи, яке може містити число + ключ перекладу
    const renderTimeWorkField = (value: string) => {
        // Розділяємо по пробілу: "10 portfolioCard.timeWork.Hours2"
        const parts = value.trim().split(' ');
        if (parts.length === 2) {
            const [number, translationKey] = parts;
            return (
                <span>
                    {number}{' '}
                    <TranslatedTitle
                        titleKey={translationKey}
                        showKey={false}
                    />
                </span>
            );
        }
        // Якщо формат не підходить, показуємо як звичайний ключ
        return <TranslatedTitle titleKey={value} showKey={false} />;
    };

    return (
        <div
            style={{
                marginTop: '8px',
                padding: '12px 16px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                lineHeight: '1.4',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '4px',
                }}
            >
                <span
                    style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#2563eb',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}
                >
                    {fieldName} - Попередній перегляд:
                </span>
            </div>
            <div
                style={{
                    color: '#e2e8f0',
                    fontWeight: '500',
                }}
            >
                {isTranslationKey ? (
                    // Спеціальна обробка для поля часу роботи
                    fieldName === 'Время выполнения' && value.includes(' ') ? (
                        renderTimeWorkField(value)
                    ) : (
                        <TranslatedTitle titleKey={value} showKey={false} />
                    )
                ) : (
                    value
                )}
            </div>
            {isTranslationKey && (
                <div
                    style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        marginTop: '4px',
                        fontFamily: 'monospace',
                    }}
                >
                    Ключ: {value}
                </div>
            )}
        </div>
    );
};

export default FieldPreview;
