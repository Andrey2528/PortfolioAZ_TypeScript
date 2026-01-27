import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { IPortfolioCardFull } from '../../shared/interface/Card.interface';
import { normalizePortfolioCards } from '../../utils/dataUtils';
import { cacheManager, CACHE_TTL } from '../../utils/cacheManager';

export const fetchPortfolioCards = async (): Promise<IPortfolioCardFull[]> => {
    try {
        return await cacheManager.wrap(
            'portfolio_cards_database',
            async () => {
                const querySnapshot = await getDocs(
                    collection(db, 'portfolioCardData'),
                );
                const cards: any[] = [];
                querySnapshot.forEach((doc) => {
                    cards.push({ ...doc.data(), id: doc.id });
                });
                return normalizePortfolioCards(cards);
            },
            { ttl: CACHE_TTL.MEDIUM },
        );
    } catch (error) {
        console.error('Error fetching portfolio cards:', error);
        return [];
    }
};

export const fetchSertificateCards = async (): Promise<
    IPortfolioCardFull[]
> => {
    try {
        return await cacheManager.wrap(
            'sertificate_cards_database',
            async () => {
                const querySnapshot = await getDocs(
                    collection(db, 'sertificateData'),
                );
                const cards: any[] = [];
                querySnapshot.forEach((doc) => {
                    cards.push({ ...doc.data(), id: doc.id });
                });
                return normalizePortfolioCards(cards);
            },
            { ttl: CACHE_TTL.MEDIUM },
        );
    } catch (error) {
        console.error('Error fetching sertificate cards:', error);
        return [];
    }
};
