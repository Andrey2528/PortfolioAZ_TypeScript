import {
    collection,
    doc,
    setDoc,
    writeBatch,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';

// Імпорт існуючих перекладів
import ukTranslations from '../../locales/uk/translation.json';
import enTranslations from '../../locales/en/translation.json';
import ruTranslations from '../../locales/ru/translation.json';

// Функція для конвертації вкладених об'єктів в плоскі ключі
const flattenObject = (obj: any, prefix = ''): Record<string, string> => {
    let flattened: Record<string, string> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (
                typeof obj[key] === 'object' &&
                obj[key] !== null &&
                !Array.isArray(obj[key])
            ) {
                // Рекурсивно обробляємо вкладені об'єкти
                Object.assign(flattened, flattenObject(obj[key], newKey));
            } else {
                // Зберігаємо примітивні значення
                flattened[newKey] = String(obj[key]);
            }
        }
    }

    return flattened;
};

// Функція для імпорту перекладів з JSON файлів до Firebase
export const importTranslationsToFirebase = async (): Promise<{
    success: number;
    errors: string[];
}> => {
    try {
        const batch = writeBatch(db);
        const errors: string[] = [];
        let successCount = 0;

        // Конвертуємо об'єкти в плоскі ключі
        const flatUk = flattenObject(ukTranslations);
        const flatEn = flattenObject(enTranslations);
        const flatRu = flattenObject(ruTranslations);

        // Отримуємо всі унікальні ключі
        const allKeys = new Set([
            ...Object.keys(flatUk),
            ...Object.keys(flatEn),
            ...Object.keys(flatRu),
        ]);

        console.log(`Preparing to import ${allKeys.size} translation keys...`);

        // Створюємо документи для кожного ключа
        for (const key of allKeys) {
            try {
                const translationData = {
                    key,
                    uk: flatUk[key] || '',
                    en: flatEn[key] || '',
                    ru: flatRu[key] || '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                // Створюємо унікальний ID на основі ключа (замінюємо крапки на підкреслення)
                const docId = key.replace(/\./g, '_');
                const docRef = doc(collection(db, 'translations'), docId);

                batch.set(docRef, translationData);
                successCount++;
            } catch (error) {
                errors.push(`Error preparing key "${key}": ${error}`);
            }
        }

        // Виконуємо batch операцію
        await batch.commit();

        console.log(`Successfully imported ${successCount} translations`);

        return {
            success: successCount,
            errors,
        };
    } catch (error) {
        console.error('Error importing translations:', error);
        throw error;
    }
};

// Функція для видалення всіх перекладів (для очищення перед імпортом)
export const clearAllTranslations = async (): Promise<void> => {
    try {
        const translationsRef = collection(db, 'translations');
        const snapshot = await getDocs(translationsRef);

        const batch = writeBatch(db);
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('All translations cleared');
    } catch (error) {
        console.error('Error clearing translations:', error);
        throw error;
    }
};

// Експорт для зручності
export { flattenObject };
