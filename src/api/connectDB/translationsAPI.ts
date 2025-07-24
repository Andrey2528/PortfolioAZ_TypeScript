import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import {
    ITranslation,
    ITranslationFormData,
} from '../../shared/interface/interfaceTranslation';

const COLLECTION_NAME = 'translations';

// Отримання всіх перекладів
export const fetchTranslations = async (): Promise<ITranslation[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('key', 'asc'));
        const querySnapshot = await getDocs(q);
        const translations: ITranslation[] = [];
        querySnapshot.forEach((doc) => {
            translations.push({ ...doc.data(), id: doc.id } as ITranslation);
        });
        return translations;
    } catch (error) {
        console.error('Error fetching translations:', error);
        return [];
    }
};

// Отримання перекладів по категорії
export const fetchTranslationsByCategory = async (
    category: string,
): Promise<ITranslation[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('category', '==', category),
            orderBy('key', 'asc'),
        );
        const querySnapshot = await getDocs(q);
        const translations: ITranslation[] = [];
        querySnapshot.forEach((doc) => {
            translations.push({ ...doc.data(), id: doc.id } as ITranslation);
        });
        return translations;
    } catch (error) {
        console.error('Error fetching translations by category:', error);
        return [];
    }
};

// Додавання нового перекладу
export const addTranslation = async (
    translationData: ITranslationFormData,
): Promise<string> => {
    try {
        const now = new Date().toISOString();
        const docData: Omit<ITranslation, 'id'> = {
            ...translationData,
            createdAt: now,
            updatedAt: now,
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
        return docRef.id;
    } catch (error) {
        console.error('Error adding translation:', error);
        throw error;
    }
};

// Оновлення перекладу
export const updateTranslation = async (
    id: string,
    translationData: Partial<ITranslationFormData>,
): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const updateData = {
            ...translationData,
            updatedAt: new Date().toISOString(),
        };
        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error('Error updating translation:', error);
        throw error;
    }
};

// Видалення перекладу
export const deleteTranslation = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error('Error deleting translation:', error);
        throw error;
    }
};

// Генерація структури перекладів для i18next
export const generateTranslationStructure = (
    translations: ITranslation[],
): Record<string, any> => {
    const structure: Record<string, any> = {
        en: {},
        ru: {},
        uk: {},
    };

    translations.forEach((translation) => {
        const keyParts = translation.key.split('.');

        // Створюємо вкладену структуру для кожної мови
        ['en', 'ru', 'uk'].forEach((lang) => {
            let current = structure[lang];

            // Проходимо по всіх частинах ключа окрім останньої
            for (let i = 0; i < keyParts.length - 1; i++) {
                if (!current[keyParts[i]]) {
                    current[keyParts[i]] = {};
                }
                current = current[keyParts[i]];
            }

            // Встановлюємо значення для останньої частини ключа
            const lastKey = keyParts[keyParts.length - 1];
            current[lastKey] = translation[lang as keyof ITranslation];
        });
    });

    return structure;
};

// Експорт перекладів в JSON формат
export const exportTranslationsToJSON = async (): Promise<
    Record<string, any>
> => {
    try {
        const translations = await fetchTranslations();
        return generateTranslationStructure(translations);
    } catch (error) {
        console.error('Error exporting translations:', error);
        throw error;
    }
};
