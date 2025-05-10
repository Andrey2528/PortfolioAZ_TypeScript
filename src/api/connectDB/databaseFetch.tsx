import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { IPortfolioCardFull } from '@/components/Portfolio/types';

export const fetchPortfolioCards = async (): Promise<IPortfolioCardFull[]> => {
    try {
        const querySnapshot = await getDocs(
            collection(db, 'portfolioCardData'),
        );
        const cards: IPortfolioCardFull[] = [];
        querySnapshot.forEach((doc) => {
            cards.push(doc.data() as IPortfolioCardFull);
        });
        return cards;
    } catch (error) {
        console.error('Error fetching portfolio cards:', error);
        return [];
    }
};
