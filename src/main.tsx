import i18n from './utils/i18n.js';

import router from '@/router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/theme/ThemeContext';

import '@/utils/firebase';
import { I18nextProvider } from 'react-i18next';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
    <I18nextProvider i18n={i18n}>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </I18nextProvider>,
);
