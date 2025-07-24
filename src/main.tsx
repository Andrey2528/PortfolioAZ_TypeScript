import { initializeI18nWithFirebase } from './utils/i18nWithFirebase.js';
import i18n from './utils/i18nWithFirebase.js';

import router from '@/router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/theme/ThemeContext';

import '@/utils/firebase';
import { I18nextProvider } from 'react-i18next';

const rootElement = document.getElementById('root') as HTMLElement;

// Ініціалізуємо i18n з Firebase перекладами перед рендерингом
initializeI18nWithFirebase()
    .then(() => {
        ReactDOM.createRoot(rootElement).render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </I18nextProvider>,
        );
    })
    .catch((error) => {
        console.error('Failed to initialize i18n:', error);
        // Все одно рендеримо додаток навіть якщо Firebase переклади не завантажились
        ReactDOM.createRoot(rootElement).render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </I18nextProvider>,
        );
    });
