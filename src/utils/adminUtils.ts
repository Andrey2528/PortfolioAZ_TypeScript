import { User } from 'firebase/auth';

// В реальном проекте эти email'ы лучше хранить в переменных окружения или в базе данных
const getAdminEmailsFromEnv = (): string[] => {
    const envEmails = import.meta.env.VITE_ADMIN_EMAILS;
    if (envEmails) {
        return envEmails.split(',').map((email: string) => email.trim());
    }
    // Fallback список
    return [
        'admin@yoursite.com', // Замените на ваш реальный email
        // Добавьте другие admin email'ы при необходимости
    ];
};

const ADMIN_EMAILS = getAdminEmailsFromEnv();

export const isAdmin = (user: User | null): boolean => {
    if (!user || !user.email) {
        return false;
    }

    return ADMIN_EMAILS.includes(user.email.toLowerCase());
};

export const getAdminEmails = (): string[] => {
    return [...ADMIN_EMAILS];
};
