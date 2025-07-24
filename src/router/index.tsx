import { createHashRouter } from 'react-router-dom';

import { InfoPage, HomePage, SertificatePage, AdminPage } from '@/pages';

import {
    PAGE_HOME,
    PAGE_INFO,
    PAGE_SERTIFICATE,
    PAGE_ADMIN,
} from '@/api/routes';
import Layout from '@/layout/layout';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: PAGE_HOME, element: <HomePage /> },
            { path: PAGE_INFO, element: <InfoPage /> },
            { path: PAGE_SERTIFICATE, element: <SertificatePage /> },
        ],
    },
    // Админка без основного лэйаута
    {
        path: PAGE_ADMIN,
        element: <AdminPage />,
    },
];

export default createHashRouter(routes);
