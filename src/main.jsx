import router from '@/router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/ThemeContext';

import './i18n';

ReactGA.initialize('G-1C7BB6MY4W', { debug: false });

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
