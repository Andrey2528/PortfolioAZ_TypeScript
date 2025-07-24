import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import TranslatedTitle from './TranslatedTitle';

interface ProjectsQuickViewProps {
    cards: IPortfolioCardFull[];
    onSelectProject: (card: IPortfolioCardFull) => void;
}

const ProjectsQuickView: React.FC<ProjectsQuickViewProps> = ({
    cards,
    onSelectProject,
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = cards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t(card.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t(card.subTitle).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (!isOpen) {
        return (
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow =
                            '0 8px 25px rgba(37, 99, 235, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow =
                            '0 4px 20px rgba(37, 99, 235, 0.3)';
                    }}
                >
                    📋 Проекти ({cards.length})
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '400px',
                maxHeight: '500px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                color: 'white',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    borderBottom: '1px solid #334155',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3 style={{ margin: 0, fontSize: '18px' }}>
                    Проекти ({cards.length})
                </h3>
                <button
                    onClick={() => setIsOpen(false)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                    }}
                >
                    ✕
                </button>
            </div>

            <div style={{ padding: '16px' }}>
                <input
                    type="text"
                    placeholder="Пошук проектів..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        marginBottom: '16px',
                        boxSizing: 'border-box',
                    }}
                />
            </div>

            <div
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '0 16px 16px',
                }}
            >
                {filteredCards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => {
                            onSelectProject(card);
                            setIsOpen(false);
                        }}
                        style={{
                            padding: '12px',
                            marginBottom: '8px',
                            background: '#0f172a',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1e293b';
                            e.currentTarget.style.borderColor = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#0f172a';
                            e.currentTarget.style.borderColor = '#334155';
                        }}
                    >
                        <div
                            style={{
                                fontWeight: '600',
                                marginBottom: '4px',
                                fontSize: '14px',
                            }}
                        >
                            <TranslatedTitle titleKey={card.title} />
                        </div>
                        <div
                            style={{
                                fontSize: '12px',
                                color: '#94a3b8',
                                marginBottom: '4px',
                            }}
                        >
                            <TranslatedTitle titleKey={card.subTitle} />
                        </div>
                        <div
                            style={{
                                fontSize: '11px',
                                color: '#64748b',
                            }}
                        >
                            {card.year} • {card.company}
                        </div>
                    </div>
                ))}

                {filteredCards.length === 0 && (
                    <div
                        style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#64748b',
                            fontSize: '14px',
                        }}
                    >
                        Проекти не знайдені
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsQuickView;
