import i18n from '../../utils/i18n';
import { fetchPortfolioCards } from './databaseFetch';
import { normalizeDBData } from '../normalizeData/normalizeDBData';

export const getNormalizedData = async () => {
    const rawData = await fetchPortfolioCards();
    const tEn = i18n.getFixedT('en');
    return normalizeDBData(rawData, tEn);
};
