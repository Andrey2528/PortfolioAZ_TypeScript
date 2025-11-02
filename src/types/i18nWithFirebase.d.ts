// Type declarations for i18nWithFirebase.js
declare module '*/i18nWithFirebase' {
    export function initializeI18nWithFirebase(): Promise<void>;
    export function reloadTranslations(): Promise<void>;

    const i18n: any;
    export default i18n;
}

// Also support .js extension
declare module '*/i18nWithFirebase.js' {
    export * from '*/i18nWithFirebase';
}
