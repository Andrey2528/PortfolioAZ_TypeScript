import i18next from '@/i18n';
import certificateBlockchain1 from '@/assets/images/sertificateIMG/certificateBlockchain1.webp';
import certificateBlockchain2 from '@/assets/images/sertificateIMG/certificateBlockchain2.webp';
import certificateBlockchain3 from '@/assets/images/sertificateIMG/certificateBlockchain3.webp';
import certificateBlockchain4 from '@/assets/images/sertificateIMG/certificateBlockchain4.webp';
import certificateMarketing from '@/assets/images/sertificateIMG/certificateMarketing.webp';
import certificateWeb1 from '@/assets/images/sertificateIMG/certificateWeb1.webp';
import certificateWeb2 from '@/assets/images/sertificateIMG/certificateWeb2.webp';
import certificateWeb3 from '@/assets/images/sertificateIMG/certificateWeb3.webp';
import certificateWeb4 from '@/assets/images/sertificateIMG/certificateWeb4.webp';

export const certificateImg = [
    {
        id: 8,
        title: i18next.t('certificate.title9'),
        date: '2023-05-26',
        img: certificateWeb4,
    },
    {
        id: 7,
        title: i18next.t('certificate.title8'),
        date: '2022-03-20',
        img: certificateWeb3,
    },
    {
        id: 6,
        title: i18next.t('certificate.title7'),
        date: '2022-03-19',
        img: certificateWeb2,
    },
    {
        id: 5,
        title: i18next.t('certificate.title6'),
        date: '2022-01-11',
        img: certificateWeb1,
    },
    {
        id: 4,
        title: i18next.t('certificate.title5'),
        date: '2024-06-12',
        img: certificateBlockchain4,
    },
    {
        id: 3,
        title: i18next.t('certificate.title4'),
        date: '2024-06-12',
        img: certificateBlockchain3,
    },
    {
        id: 2,
        title: i18next.t('certificate.title3'),
        date: '2024-06-12',
        img: certificateBlockchain2,
    },
    {
        id: 1,
        title: i18next.t('certificate.title2'),
        date: '2024-06-12',
        img: certificateBlockchain1,
    },
    {
        id: 0,
        title: i18next.t('certificate.title1'),
        date: '2024-06-20',
        img: certificateMarketing,
    },
];

export default certificateImg;
