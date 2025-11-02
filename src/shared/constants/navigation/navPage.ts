import i18next from '../../../utils/i18nWithFirebase';

export const navPage = [
    {
        id: 1,
        title: i18next.t('navMenu.link2'),
        route: '/InfoPage',
    },
    {
        id: 2,
        title: i18next.t('navMenu.link3'),
        route: '/',
    },
    {
        id: 3,
        title: i18next.t('navMenu.link4'),
        route: '/SertificatePage',
    },
];

export default navPage;
