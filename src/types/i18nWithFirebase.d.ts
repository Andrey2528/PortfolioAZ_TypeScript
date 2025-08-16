// Type declarations for i18nWithFirebase.js
declare module '../../utils/i18nWithFirebase' {
    export function initializeI18nWithFirebase(): Promise<void>;
    export function reloadTranslations(): Promise<void>;

    const i18n: any;
    export default i18n;
}
