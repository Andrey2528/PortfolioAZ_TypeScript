import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import {
    normalizePortfolioCards,
    prepareCardDataForSave,
} from '../../utils/dataUtils';

// Получение следующего числового ID для портфолио
const getNextPortfolioId = async (): Promise<number> => {
    try {
        const q = query(
            collection(db, 'portfolioCardData'),
            orderBy('numericId', 'desc'),
            limit(1),
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return 1; // Первый проект
        }

        const lastDoc = querySnapshot.docs[0];
        const lastNumericId = lastDoc.data().numericId || 0;
        return lastNumericId + 1;
    } catch (error) {
        console.error('Error getting next portfolio ID:', error);
        // В случае ошибки, получаем количество документов + 1
        const querySnapshot = await getDocs(
            collection(db, 'portfolioCardData'),
        );
        return querySnapshot.size + 1;
    }
};

// Получение всех карточек портфолио
export const fetchPortfolioCards = async (): Promise<IPortfolioCardFull[]> => {
    try {
        const q = query(
            collection(db, 'portfolioCardData'),
            orderBy('numericId', 'asc'),
        );
        const querySnapshot = await getDocs(q);
        const cards: any[] = [];
        querySnapshot.forEach((doc) => {
            cards.push({
                ...doc.data(),
                id: doc.id,
                numericId: doc.data().numericId || parseInt(doc.id) || 0,
            });
        });
        return normalizePortfolioCards(cards);
    } catch (error) {
        console.error('Error fetching portfolio cards:', error);
        return [];
    }
};

// Получение всех сертификатов
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

// Добавление новой карточки портфолио
export const addPortfolioCard = async (
    cardData: Omit<IPortfolioCardFull, 'id'>,
): Promise<string> => {
    try {
        const nextId = await getNextPortfolioId();
        const preparedData = {
            ...prepareCardDataForSave(cardData),
            numericId: nextId,
        };

        // Используем числовой ID как строковый документ ID
        const docRef = doc(db, 'portfolioCardData', nextId.toString());
        await setDoc(docRef, preparedData);

        return nextId.toString();
    } catch (error) {
        console.error('Error adding portfolio card:', error);
        throw error;
    }
};

// Обновление карточки портфолио
export const updatePortfolioCard = async (
    id: string,
    cardData: Partial<IPortfolioCardFull>,
): Promise<void> => {
    try {
        const preparedData = prepareCardDataForSave(cardData);
        const docRef = doc(db, 'portfolioCardData', id);
        await updateDoc(docRef, preparedData);
    } catch (error) {
        console.error('Error updating portfolio card:', error);
        throw error;
    }
};

// Удаление карточки портфолио
export const deletePortfolioCard = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'portfolioCardData', id));
    } catch (error) {
        console.error('Error deleting portfolio card:', error);
        throw error;
    }
};

// Добавление нового сертификата
export const addSertificateCard = async (
    cardData: Omit<IPortfolioCardFull, 'id'>,
): Promise<string> => {
    try {
        const docRef = await addDoc(
            collection(db, 'sertificateData'),
            cardData,
        );
        return docRef.id;
    } catch (error) {
        console.error('Error adding sertificate card:', error);
        throw error;
    }
};

// Обновление сертификата
export const updateSertificateCard = async (
    id: string,
    cardData: Partial<IPortfolioCardFull>,
): Promise<void> => {
    try {
        const docRef = doc(db, 'sertificateData', id);
        await updateDoc(docRef, cardData);
    } catch (error) {
        console.error('Error updating sertificate card:', error);
        throw error;
    }
};

// Удаление сертификата
export const deleteSertificateCard = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'sertificateData', id));
    } catch (error) {
        console.error('Error deleting sertificate card:', error);
        throw error;
    }
};
