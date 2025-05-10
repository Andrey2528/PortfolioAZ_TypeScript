import { portfolioCardDB } from '@/api/db/portfolioCardDB';
import { certificateDB } from '@/api/db/certificateDB';
import { TFunction } from 'i18next';

export const getUniqueRoles = () => {
    return Array.from(
        new Set(
            portfolioCardDB.flatMap((card) =>
                card.role.split(',').map((role) => role.trim()),
            ),
        ),
    );
};

export const getUniqueYears = () => {
    return Array.from(new Set(portfolioCardDB.map((card) => card.year))).sort(
        (a, b) => b - a,
    );
};

export const getTimeOptions = (t: TFunction) => [
    { value: '', label: t('filter.all') },
    { value: '10', label: t('filter.timeLessThan10') },
    { value: '20', label: t('filter.timeLessThan20') },
    { value: '50', label: t('filter.timeLessThan50') },
    { value: '100', label: t('filter.timeLessThan100') },
];

export const getUniqueCompanies = () => {
    return Array.from(new Set(certificateDB.map((cert) => cert.company)));
};
