import i18next from '../../../utils/i18nWithFirebase';

interface ThemeOption {
    id: string;
    titleKey: string; // Зберігаємо ключ перекладу
    value: string;
}

export const themeDB: ThemeOption[] = [
    {
        id: 'dark',
        titleKey: 'theme.dark',
        value: 'dark',
    },
    {
        id: 'light',
        titleKey: 'theme.light',
        value: 'light',
    },
];

export default themeDB;
