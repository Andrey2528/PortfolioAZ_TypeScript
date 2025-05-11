//import { portfolioCardDB } from '@/api/db/portfolioCardDB';
import { certificateDB } from '@/api/db/certificateDB';
import { TFunction } from 'i18next';
import { IPortfolioCardFull } from '@/utils/interface/interfaceCard';

export const getUniqueRoles = (
    cards: IPortfolioCardFull[],
    t: TFunction,
): string[] => {
    const roles = Array.from(
        new Set(
            cards.flatMap((card) =>
                card.role.split(',').map((role) => role.trim()),
            ),
        ),
    );

    return roles.map((role) => t(role));
};

export const getUniqueYears = (cards: IPortfolioCardFull[]): number[] => {
    return Array.from(new Set(cards.map((card) => card.year))).sort(
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

export const getUniqueCompanies = (
    sertificates: IPortfolioCardFull[],
    t: TFunction,
): string[] => {
    const comoany = Array.from(
        new Set(sertificates.map((cert) => cert.company || '')),
    );
    return comoany.map((company) => t(company));
};
