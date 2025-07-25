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
            const key = doc.id;
            
            if (data.en) translations.en[key] = data.en;
            if (data.uk) translations.uk[key] = data.uk;
            if (data.ru) translations.ru[key] = data.ru;
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

        // Об'єднуємо статичні переклади з Firebase перекладами
        const mergedTranslations = {
            en: { ...en, ...firebaseTranslations.en },
            uk: { ...uk, ...firebaseTranslations.uk },
            ru: { ...ru, ...firebaseTranslations.ru },
        };

        // Використовуємо об'єднані переклади якщо є дані з Firebase, інакше статичні
        const resources = hasFirebaseData
            ? {
                  en: { translation: mergedTranslations.en },
                  uk: { translation: mergedTranslations.uk },
                  ru: { translation: mergedTranslations.ru },
              }
            : {
                  en: { translation: en },
                  uk: { translation: uk },
                  ru: { translation: ru },
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
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(
                            `Missing translation key: ${key} for languages: ${lngs.join(', ')}`,
                        );
                    }
                    return fallbackValue || key;
                },
                initImmediate: false,
            });

        console.log(
            'i18n initialized with',
            hasFirebaseData ? 'Firebase + static' : 'static only',
            'translations',
        );
    } catch (error) {
        console.error('Error initializing i18n with Firebase:', error);

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

        console.log(
            'i18n initialized with static translations only (fallback)',
        );
    }
};

// Функція для оновлення перекладів з Firebase (для використання в адмін-панелі)
export const reloadTranslations = async () => {
    try {
        const firebaseTranslations = await loadTranslationsFromFirebase();

        // Оновлюємо ресурси i18n
        Object.keys(firebaseTranslations).forEach((lang) => {
            const existingTranslations =
                i18n.getResourceBundle(lang, 'translation') || {};
            const mergedTranslations = {
                ...existingTranslations,
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

        console.log('Translations reloaded from Firebase');
    } catch (error) {
        console.error('Error reloading translations:', error);
    }
};

export default i18n;
