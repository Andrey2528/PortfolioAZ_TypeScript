import { createHashRouter } from 'react-router-dom';

import { InfoPage, HomePage, SertificatePage } from '@/pages';
import Layout from '@/layout/layout';

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/InfoPage', element: <InfoPage /> },
            { path: '/SertificatePage', element: <SertificatePage /> },
        ],
    },
];

export default createHashRouter(routes);
