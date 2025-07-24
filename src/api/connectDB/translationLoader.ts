import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { ITranslation } from '../../shared/interface/interfaceTranslation';

// Функція для завантаження перекладів з Firebase для i18next
export const loadTranslationsFromFirebase = async (): Promise<
    Record<string, Record<string, string>>
> => {
    try {
        const translationsSnapshot = await getDocs(
            collection(db, 'translations'),
        );
        const translations: Record<string, Record<string, string>> = {
            uk: {},
            en: {},
            ru: {},
        };

        translationsSnapshot.forEach((doc) => {
            const data = doc.data() as ITranslation;
            const { key, uk, en, ru } = data;

            // Створюємо вкладені об'єкти для ключів типу "portfolioCard.title.title1"
            const setNestedValue = (
                obj: Record<string, any>,
                path: string,
                value: string,
            ) => {
                const keys = path.split('.');
                let current = obj;

                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]];
                }

                current[keys[keys.length - 1]] = value;
            };

            setNestedValue(translations.uk, key, uk);
            setNestedValue(translations.en, key, en);
            setNestedValue(translations.ru, key, ru);
        });

        return translations;
    } catch (error) {
        console.error('Error loading translations from Firebase:', error);
        // Повертаємо порожній об'єкт у випадку помилки
        return {
            uk: {},
            en: {},
            ru: {},
        };
    }
};
