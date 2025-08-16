import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

// Статичні переклади як fallback
import en from '../locales/en/translation.json';
import uk from '../locales/uk/translation.json';
import ru from '../locales/ru/translation.json';

// Функція для завантаження перекладів з Firebase
const loadTranslationsFromFirebase = async () => {
    try {
        const translationsCollection = collection(db, 'translations');
        const snapshot = await getDocs(translationsCollection);

        const translations = { en: {}, uk: {}, ru: {} };

        snapshot.forEach((doc) => {
            const data = doc.data();
            const key = data.key; // Використовуємо поле key замість doc.id

            if (key) {
                // Створюємо вкладену структуру для ключів типу "portfolioCard.title.title13"
                const keyParts = key.split('.');

                ['en', 'uk', 'ru'].forEach((lang) => {
                    if (data[lang]) {
                        let current = translations[lang];

                        // Створюємо вкладену структуру
                        for (let i = 0; i < keyParts.length - 1; i++) {
                            if (!current[keyParts[i]]) {
                                current[keyParts[i]] = {};
                            }
                            current = current[keyParts[i]];
                        }

                        // Встановлюємо значення для останньої частини ключа
                        current[keyParts[keyParts.length - 1]] = data[lang];
                    }
                });
            }
        });

        return translations;
    } catch (error) {
        console.error('Error loading translations from Firebase:', error);
        return { en: {}, uk: {}, ru: {} };
    }
};

// Функція для ініціалізації i18n з Firebase перекладами
export const initializeI18nWithFirebase = async () => {
    try {
        // Спробуємо завантажити переклади з Firebase
        const firebaseTranslations = await loadTranslationsFromFirebase();

        // Перевіряємо чи є дані з Firebase
        const hasFirebaseData =
            Object.keys(firebaseTranslations.uk).length > 0 ||
            Object.keys(firebaseTranslations.en).length > 0 ||
            Object.keys(firebaseTranslations.ru).length > 0;

        // Об'єднуємо статичні переклади з Firebase перекладами (пріоритет Firebase)
        const mergedTranslations = {
            en: { ...en, ...firebaseTranslations.en },
            uk: { ...uk, ...firebaseTranslations.uk },
            ru: { ...ru, ...firebaseTranslations.ru },
        };

        // Завжди використовуємо об'єднані переклади
        const resources = {
            en: { translation: mergedTranslations.en },
            uk: { translation: mergedTranslations.uk },
            ru: { translation: mergedTranslations.ru },
        };

        await i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                debug: process.env.NODE_ENV === 'development',
                supportedLngs: ['en', 'uk', 'ru'],
                fallbackLng: 'en',
                resources,
                interpolation: {
                    escapeValue: false,
                },
                detection: {
                    order: [
                        'cookie',
                        'localStorage',
                        'querystring',
                        'navigator',
                    ],
                    caches: ['cookie'],
                },
                react: {
                    useSuspense: false,
                },
                missingKeyHandler: (lngs, ns, key, fallbackValue) => {
                    console.warn(
                        `❌ Missing translation key: ${key} for languages: ${lngs.join(', ')}`,
                    );
                    return fallbackValue || key;
                },
                initImmediate: false,
            });

        // i18n ініціалізовано успішно
    } catch (error) {
        console.error('❌ Error initializing i18n with Firebase:', error);

        // Fallback до статичних перекладів
        await i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                debug: process.env.NODE_ENV === 'development',
                supportedLngs: ['en', 'uk', 'ru'],
                fallbackLng: 'en',
                resources: {
                    en: { translation: en },
                    uk: { translation: uk },
                    ru: { translation: ru },
                },
                interpolation: {
                    escapeValue: false,
                },
                detection: {
                    order: [
                        'cookie',
                        'localStorage',
                        'querystring',
                        'navigator',
                    ],
                    caches: ['cookie'],
                },
                react: {
                    useSuspense: false,
                },
                initImmediate: false,
            });

        // Fallback до статичних перекладів
    }
};

// Функція для оновлення перекладів з Firebase (для використання в адмін-панелі)
export const reloadTranslations = async () => {
    try {
        const firebaseTranslations = await loadTranslationsFromFirebase();

        // Оновлюємо ресурси i18n
        Object.keys(firebaseTranslations).forEach((lang) => {
            const existingStaticTranslations =
                lang === 'en' ? en : lang === 'uk' ? uk : ru;
            const mergedTranslations = {
                ...existingStaticTranslations,
                ...firebaseTranslations[lang],
            };
            i18n.addResourceBundle(
                lang,
                'translation',
                mergedTranslations,
                true,
                true,
            );
        });

        // Примусово оновлюємо інтерфейс
        i18n.emit('loaded');
    } catch (error) {
        console.error('Error reloading translations:', error);
    }
};

export default i18n;
