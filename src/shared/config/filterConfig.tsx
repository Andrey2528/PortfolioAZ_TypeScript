//import { portfolioCardDB } from '@/api/db/portfolioCardDB';
//import { certificateDB } from '@/api/db/certificateDB';
import { TFunction } from 'i18next';
import { IPortfolioCardFull } from '@/utils/interface/interfaceCard';

interface IRoleMapping {
    [key: string]: string;
}

export const getRoles = (t: TFunction): { key: string; label: string }[] => {
    const roleMapping: IRoleMapping = {
        role1: 'Developer',
        role2: 'Designer',
        role3: 'Project Manager',
        role4: 'Team Lead',
    };

    return Object.entries(roleMapping).map(([key, value]) => ({
        key,
        label: t(`portfolioCard.${key}`),
    }));
};

// Приклад функції getFilteredRoles
export const getFilteredRoles = (
    cards: IPortfolioCardFull[],
    selectedRole: string,
): IPortfolioCardFull[] => {
    console.log('Cards:', cards);
    console.log('Selected Role:', selectedRole);

    if (!selectedRole) {
        console.log('No role selected, returning all cards.');
        return cards; // Якщо роль не вибрана, повертаємо всі картки
    }

    const filteredCards = cards.filter((card) => {
        // Видаляємо префікс "portfolioCard." з ролі
        const normalizedRoles = card.role
            .split(',') // Розбиваємо список ролей, якщо вони розділені комами
            .map((role) => role.trim().replace('portfolioCard.', '')); // Видаляємо пробіли та префікс

        console.log('Normalized Roles:', normalizedRoles);

        // Перевіряємо, чи містить список ролей обрану роль
        return normalizedRoles.includes(selectedRole);
    });

    console.log('Filtered Cards:', filteredCards);

    return filteredCards;
};

export const getFilteredYears = (cards: IPortfolioCardFull[]): number[] => {
    // Отримуємо унікальні роки, відфільтровуємо нечислові значення
    return Array.from(
        new Set(
            cards
                .map((card) => card.year)
                .filter((year): year is number => typeof year === 'number'),
        ),
    ).sort((a, b) => b - a);
};

export const getFilteredCompanies = (
    cards: IPortfolioCardFull[],
    t: TFunction,
): string[] => {
    console.log('Input Cards:', cards);

    // Отримуємо унікальні компанії, перевіряючи наявність поля company
    const companies = Array.from(
        new Set(
            cards
                .map((card) => card.company?.trim()) // Беремо поле company, якщо воно є
                .filter((company): company is string => !!company), // Фільтруємо порожні або некоректні значення
        ),
    );

    console.log('Unique Companies:', companies);

    // Перекладаємо компанії для поточної мови (якщо потрібно)
    const translatedCompanies = companies.map(
        (company) => t(`${company}`) || company,
    );

    console.log('Translated Companies:', translatedCompanies);

    return translatedCompanies;
};
