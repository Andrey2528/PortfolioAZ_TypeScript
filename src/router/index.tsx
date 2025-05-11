import { createHashRouter } from 'react-router-dom';

import { InfoPage, HomePage, SertificatePage } from '@/pages';

import { PAGE_HOME, PAGE_INFO, PAGE_SERTIFICATE } from '@/router/routes';
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
];

export default createHashRouter(routes);
