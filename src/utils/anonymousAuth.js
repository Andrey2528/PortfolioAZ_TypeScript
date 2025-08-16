import { auth } from './firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

let isAuthenticating = false;
let authPromise = null;

// Функція для автентифікації користувача анонімно
export const ensureAuthenticated = async () => {
    return new Promise((resolve, reject) => {
        // Якщо користувач вже автентифікований
        if (auth.currentUser) {
            console.log(
                '👤 Користувач вже автентифікований:',
                auth.currentUser.uid,
            );
            resolve(auth.currentUser);
            return;
        }

        // Якщо вже йде процес автентифікації
        if (isAuthenticating && authPromise) {
            return authPromise;
        }

        isAuthenticating = true;

        // Слухаємо зміни стану автентифікації
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('✅ Анонімна автентифікація успішна:', user.uid);
                unsubscribe();
                isAuthenticating = false;
                resolve(user);
            }
        });

        // Запускаємо анонімну автентифікацію
        authPromise = signInAnonymously(auth)
            .then((result) => {
                console.log(
                    '🔑 Анонімний користувач створений:',
                    result.user.uid,
                );
                return result.user;
            })
            .catch((error) => {
                console.error('❌ Помилка анонімної автентифікації:', error);
                unsubscribe();
                isAuthenticating = false;
                reject(error);
            });
    });
};

// Автоматично запускаємо анонімну автентифікацію при завантаженні
export const initAnonymousAuth = async () => {
    try {
        await ensureAuthenticated();
        console.log('🚀 Автентифікація ініціалізована');
    } catch (error) {
        console.error('🔴 Не вдалося ініціалізувати автентифікацію:', error);
    }
};
