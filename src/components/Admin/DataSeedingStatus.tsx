import React, { useState, useEffect } from 'react';
import {
    getCertificates,
    getSkills,
    getSocialLinks,
} from '../../api/connectDB/dataAPI';
import { fetchPortfolioCards } from '../../api/connectDB/adminAPI';

interface DataCounts {
    portfolio: number;
    certificates: number;
    skills: number;
    social: number;
}

const DataSeedingStatus: React.FC = () => {
    const [dataCounts, setDataCounts] = useState<DataCounts>({
        portfolio: 0,
        certificates: 0,
        skills: 0,
        social: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDataCounts();
    }, []);

    const loadDataCounts = async () => {
        setLoading(true);
        try {
            const [portfolio, certificates, skills, social] = await Promise.all(
                [
                    fetchPortfolioCards(),
                    getCertificates(),
                    getSkills(),
                    getSocialLinks(),
                ],
            );

            setDataCounts({
                portfolio: portfolio.length,
                certificates: certificates.length,
                skills: skills.length,
                social: social.length,
            });
        } catch (error) {
            console.error('Error loading data counts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="data-seeding-status loading">
                <div className="status-item">
                    <span className="status-icon">⏳</span>
                    <span className="status-text">
                        Завантаження статистики...
                    </span>
                </div>
            </div>
        );
    }

    const getStatusColor = (count: number) => {
        if (count === 0) return 'warning';
        if (count < 5) return 'info';
        return 'success';
    };

    const getStatusIcon = (count: number) => {
        if (count === 0) return '⚠️';
        if (count < 5) return '📊';
        return '✅';
    };

    return (
        <div className="data-seeding-status">
            <h3 className="status-title">📈 Статистика даних</h3>

            <div className="status-grid">
                <div
                    className={`status-item ${getStatusColor(dataCounts.portfolio)}`}
                >
                    <span className="status-icon">
                        {getStatusIcon(dataCounts.portfolio)}
                    </span>
                    <div className="status-info">
                        <div className="status-label">Проекти портфоліо</div>
                        <div className="status-count">
                            {dataCounts.portfolio}
                        </div>
                    </div>
                </div>

                <div
                    className={`status-item ${getStatusColor(dataCounts.certificates)}`}
                >
                    <span className="status-icon">
                        {getStatusIcon(dataCounts.certificates)}
                    </span>
                    <div className="status-info">
                        <div className="status-label">Сертифікати</div>
                        <div className="status-count">
                            {dataCounts.certificates}
                        </div>
                    </div>
                </div>

                <div
                    className={`status-item ${getStatusColor(dataCounts.skills)}`}
                >
                    <span className="status-icon">
                        {getStatusIcon(dataCounts.skills)}
                    </span>
                    <div className="status-info">
                        <div className="status-label">Навички</div>
                        <div className="status-count">{dataCounts.skills}</div>
                    </div>
                </div>

                <div
                    className={`status-item ${getStatusColor(dataCounts.social)}`}
                >
                    <span className="status-icon">
                        {getStatusIcon(dataCounts.social)}
                    </span>
                    <div className="status-info">
                        <div className="status-label">Соціальні мережі</div>
                        <div className="status-count">{dataCounts.social}</div>
                    </div>
                </div>
            </div>

            <div className="status-summary">
                <div className="summary-item">
                    <strong>Всього записів:</strong>{' '}
                    {Object.values(dataCounts).reduce((a, b) => a + b, 0)}
                </div>
                <button
                    className="btn btn-small btn-secondary"
                    onClick={loadDataCounts}
                >
                    🔄 Оновити
                </button>
            </div>
        </div>
    );
};

export default DataSeedingStatus;
