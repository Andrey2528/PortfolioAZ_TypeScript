import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import { normalizePortfolioCards } from '../../utils/dataUtils';

export const fetchPortfolioCards = async (): Promise<IPortfolioCardFull[]> => {
    try {
        const querySnapshot = await getDocs(
            collection(db, 'portfolioCardData'),
        );
        const cards: any[] = [];
        querySnapshot.forEach((doc) => {
            cards.push({ ...doc.data(), id: doc.id });
        });
        return normalizePortfolioCards(cards);
    } catch (error) {
        console.error('Error fetching portfolio cards:', error);
        return [];
    }
};

export const fetchSertificateCards = async (): Promise<
    IPortfolioCardFull[]
> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'sertificateData'));
        const cards: any[] = [];
        querySnapshot.forEach((doc) => {
            cards.push({ ...doc.data(), id: doc.id });
        });
        return normalizePortfolioCards(cards);
    } catch (error) {
        console.error('Error fetching sertificate cards:', error);
        return [];
    }
};
