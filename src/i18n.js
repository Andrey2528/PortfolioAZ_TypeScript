import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import uk from './locales/uk/translation.json';
import ru from './locales/ru/translation.json';


i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init(
        {
            debug: process.env.NODE_ENV === 'development',
            supportedLngs: ['en', 'uk', 'ru'],
            fallbackLng: 'en',
            resources: {
                en: { translation: en },
                uk: { translation: uk },
                ru: { translation: ru },
            },
            interpolation: {
                escapeValue: false, // React уже екранує виведення
            },
            detection: {
                order: ['cookie', 'localStorage', 'querystring', 'navigator'],
                caches: ['cookie'],
            },
            react: {
                useSuspense: false, // Залишаємо вимкненим для сумісності
            },
            missingKeyHandler: (lngs, ns, key, fallbackValue) => {
                console.warn(
                    `Missing translation key: ${key} for languages: ${lngs.join(', ')}`,
                );
                return fallbackValue || key; // Повертає ключ як запасне значення
            },
            // Забезпечуємо синхронну ініціалізацію
            initImmediate: false,
        },

    );

export default i18n;
