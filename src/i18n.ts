import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/translation.json';
import uk from '@/locales/uk/translation.json';
import ru from '@/locales/ru/translation.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        supportedLngs: ['en', 'uk', 'ru'], // ← тут виправлено
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
            order: ['cookie'],
            caches: ['cookie'],
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
