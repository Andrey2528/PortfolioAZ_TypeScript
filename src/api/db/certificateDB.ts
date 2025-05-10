import i18next from '@/i18n';

export interface ICertificate {
    id: number;
    title: string;
    subTitle: string;
    company: string;
    date: string;
    img: string;
}

export const certificateDB: ICertificate[] = [
    {
        id: 9,
        title: i18next.t('certificate.title.title9'),
        subTitle: 'certificate.subTitle.subTitle2',
        company: 'certificate.company.company1',
        date: '2024-06-20',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateMarketing-CDulL2c0.webp',
    },
    {
        id: 8,
        title: i18next.t('certificate.title.title8'),
        subTitle: 'certificate.subTitle.subTitle2',
        company: 'certificate.company.company2',
        date: '2024-06-12',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateBlockchain4-JNYVK43_.webp',
    },
    {
        id: 7,
        title: i18next.t('certificate.title.title7'),
        subTitle: 'certificate.subTitle.subTitle2',
        company: 'certificate.company.company2',
        date: '2024-06-12',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateBlockchain3-Becy4Ga0.webp',
    },
    {
        id: 6,
        title: i18next.t('certificate.title.title6'),
        subTitle: 'certificate.subTitle.subTitle2',
        company: 'certificate.company.company2',
        date: '2024-06-12',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateBlockchain2-BC8pu33G.webp',
    },
    {
        id: 5,
        title: i18next.t('certificate.title.title5'),
        subTitle: 'certificate.subTitle.subTitle2',
        company: 'certificate.company.company2',
        date: '2024-06-12',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateBlockchain1-BXvN210l.webp',
    },
    {
        id: 4,
        title: i18next.t('certificate.title.title4'),
        subTitle: 'certificate.subTitle.subTitle1',
        company: 'certificate.company.company3',
        date: '2023-05-26',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateWeb4-C-Aqh1RI.webp',
    },
    {
        id: 3,
        title: i18next.t('certificate.title.title3'),
        subTitle: i18next.t('certificate.subTitle.subTitle1'),
        company: i18next.t('certificate.company.company3'),
        date: '2022-03-20',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateWeb3-ClUOkMfC.webp',
    },
    {
        id: 2,
        title: i18next.t('certificate.title.title2'),
        subTitle: 'certificate.subTitle.subTitle1',
        company: 'certificate.company.company3',
        date: '2022-03-19',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateWeb2-DoSDfpEu.webp',
    },
    {
        id: 1,
        title: i18next.t('certificate.title.title1'),
        subTitle: 'certificate.subTitle.subTitle1',
        company: 'certificate.company.company3',
        date: '2022-01-11',
        img: 'https://andrey2528.github.io/PortfolioAZ_TypeScript/assets/certificateWeb1-BBarX8r2.webp',
    },
];

export default certificateDB;
