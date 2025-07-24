export interface ITranslation {
    id: string;
    key: string; // наприклад "portfolioCard.title.title8"
    en: string; // англійський переклад
    ru: string; // російський переклад
    uk: string; // українсьий переклад
    category: string; // категорія: 'portfolio', 'navigation', 'common', etc.
    description?: string; // опис для чого цей переклад
    updatedAt: string;
    createdAt: string;
}

export interface ITranslationFormData {
    key: string;
    en: string;
    ru: string;
    uk: string;
    category: string;
    description?: string;
}
