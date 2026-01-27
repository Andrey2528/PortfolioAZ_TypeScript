import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Layout from '@/layout/layout';

import { Loader } from '@/shared/components';

const HomePageLazy = lazy(() => import('@/pages/HomePage'));
const InfoPageLazy = lazy(() => import('@/pages/InfoPage'));
const SertificatePageLazy = lazy(() => import('@/pages/SertificatePage'));

const routes: any[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loader />}>
                        <HomePageLazy />
                    </Suspense>
                ),
            },
            {
                path: 'InfoPage',
                element: (
                    <Suspense fallback={<Loader />}>
                        <InfoPageLazy />
                    </Suspense>
                ),
            },
            {
                path: 'SertificatePage',
                element: (
                    <Suspense fallback={<Loader />}>
                        <SertificatePageLazy />
                    </Suspense>
                ),
            },
        ],
    },
];

export default createHashRouter(routes);
