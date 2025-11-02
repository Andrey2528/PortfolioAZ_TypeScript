import { TFunction } from 'i18next';
import i18n from '../../utils/i18nWithFirebase';
import { IPortfolioCardFull } from '@/shared/interface/Card.interface';

const tEn = i18n.getFixedT('en');

export const normalizeDBData = (
    cardsFromDB: any[],
    tEn: TFunction,
): IPortfolioCardFull[] => {
    return cardsFromDB.map((card) => ({
        ...card,
        normalizedRole: card.role.split(',').map((r: string) => r.trim()), // залишаємо лише ключі ролей
        normalizedCompany: card.company ? tEn(card.company) : '',
    }));
};
