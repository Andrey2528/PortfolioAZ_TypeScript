import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { IPortfolioCardFull } from '@/utils/interface/interfaceCard';

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

export const fetchSertificateCards = async (): Promise<
    IPortfolioCardFull[]
> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'sertificateData'));
        const cards: IPortfolioCardFull[] = [];
        querySnapshot.forEach((doc) => {
            cards.push(doc.data() as IPortfolioCardFull);
        });
        return cards;
    } catch (error) {
        console.error('Error fetching sertificate cards:', error);
        return [];
    }
};
