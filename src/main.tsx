import { initializeI18nWithFirebase } from './utils/i18nWithFirebase.js';
import i18n from './utils/i18nWithFirebase.js';

import router from '@/router';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/theme/ThemeContext';
import { I18nextProvider } from 'react-i18next';

const rootElement = document.getElementById('root') as HTMLElement;

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
    .catch((error: any) => {
        console.error('Помилка ініціалізації i18n:', error);
        ReactDOM.createRoot(rootElement).render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </I18nextProvider>,
        );
    });
