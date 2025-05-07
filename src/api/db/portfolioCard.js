import i18next from '@/i18n';
import img1 from '@/assets/images/portfolioIMG/portfolioImg1.webp';
import img2 from '@/assets/images/portfolioIMG/portfolioImg2.webp';
import img3 from '@/assets/images/portfolioIMG/portfolioImg3.webp';
import img4 from '@/assets/images/portfolioIMG/portfolioImg4.webp';
import img5 from '@/assets/images/portfolioIMG/portfolioImg5.webp';
import img6 from '@/assets/images/portfolioIMG/portfolioImg6.webp';
import img7 from '@/assets/images/portfolioIMG/portfolioImg7.webp';
import img8 from '@/assets/images/portfolioIMG/portfolioImg8.webp';
import img9 from '@/assets/images/portfolioIMG/portfolioImg9.webp';
import img10 from '@/assets/images/portfolioIMG/portfolioImg10.webp';
import img11 from '@/assets/images/portfolioIMG/portfolioImg11.webp';
import img12 from '@/assets/images/portfolioIMG/portfolioImg12.webp';

export const portfolioCard = [
    {
        id: 12,
        title: i18next.t('portfolioCard.title.title12'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2025',
        design: '+',
        role: i18next.t('portfolioCard.role1'),
        tag: 'React.js' + ', ' + 'SCSS' + ', ' + 'JS' + ', ' + 'BEM',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type2'),
        url: 'https://andrey2528.github.io/GrillCalc/',
        url: '',
        img: img12,
        description: i18next.t('portfolioCard.description.description12'),
        timeToEndWork: '3' + ' ' + i18next.t('portfolioCard.timeWork.Hours1'),
    },
    {
        id: 11,
        title: i18next.t('portfolioCard.title.title11'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2025',
        design: '-',
        role: i18next.t('portfolioCard.role1'),
        tag:
            'React.js' +
            ', ' +
            'SCSS' +
            ', ' +
            'JS' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type3'),
        url: 'https://andrey2528.github.io/PortfolioAZ/#/',
        url: '',
        img: img11,
        description: i18next.t('portfolioCard.description.description11'),
        timeToEndWork: '20' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 10,
        title: i18next.t('portfolioCard.title.title9'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2024',
        design: '-',
        role: i18next.t('portfolioCard.role1'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform1'),
        type: i18next.t('portfolioCard.type3'),
        url: i18next.t('portfolioCard.urlNotAviable'),
        url: '',
        img: img9,
        description: i18next.t('portfolioCard.description.description9'),
        timeToEndWork: '30' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 9,
        title: i18next.t('portfolioCard.title.title10'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2023',
        design: '+',
        role: i18next.t('portfolioCard.role1'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform1'),
        type: i18next.t('portfolioCard.type3'),
        url: 'https://andrey2528.github.io/1_drop_socks/',
        img: img10,
        description: i18next.t('portfolioCard.description10'),
        timeToEndWork: '7' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 8,
        title: i18next.t('portfolioCard.title.title8'),
        subTitle: i18next.t('portfolioCard.description.subTitle'),
        year: '2023',
        design: '-',
        role: i18next.t('portfolioCard.role1'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform1'),
        type: i18next.t('portfolioCard.type3'),
        url: 'http://sketch2site.com',
        img: img8,
        description: i18next.t('portfolioCard.description.description8'),
        timeToEndWork: '30' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },

    {
        id: 7,
        title:
            i18next.t('portfolioCard.title.title7') +
            ' ' +
            i18next.t('portfolioCard.old'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2023',
        design: '-',
        role:
            i18next.t('portfolioCard.role1') +
            ', ' +
            i18next.t('portfolioCard.role2'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'PHP' +
            ', ' +
            'WordPress' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type1'),
        url: 'http://batumikarting.ge',
        img: img7,
        description: i18next.t('portfolioCard.description.description7'),
        timeToEndWork: '200' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 6,
        title: i18next.t('portfolioCard.title.title6'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2022',
        design: '-',
        role:
            i18next.t('portfolioCard.role1') +
            ', ' +
            i18next.t('portfolioCard.role3') +
            ', ' +
            i18next.t('portfolioCard.role4'),
        tag:
            'HTML' +
            ', ' +
            'SCSS' +
            ', ' +
            'JS' +
            ', ' +
            'React.js' +
            ', ' +
            'BEM',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type2'),
        url: i18next.t('portfolioCard.urlNotAviable'),
        img: img6,
        description: i18next.t('portfolioCard.description.description6'),
        timeToEndWork: '15' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 5,
        title: i18next.t('portfolioCard.title.title5'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2022',
        design: '-',
        role:
            i18next.t('portfolioCard.role1') +
            ', ' +
            i18next.t('portfolioCard.role3') +
            ', ' +
            i18next.t('portfolioCard.role4'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'PHP' +
            ', ' +
            'WordPress' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type3'),
        img: img5,
        description: i18next.t('portfolioCard.description.description5'),
        timeToEndWork: '100' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 4,
        title: i18next.t('portfolioCard.title.title4'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2022',
        design: '-',
        role:
            i18next.t('portfolioCard.role1') +
            ', ' +
            i18next.t('portfolioCard.role3'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type2'),
        url: 'https://andrey2528.github.io/people-taback/',
        img: img4,
        description: i18next.t('portfolioCard.description.description4'),
        timeToEndWork: '9' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 3,
        title: i18next.t('portfolioCard.title.title3'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2022',
        design: '-',
        role:
            i18next.t('portfolioCard.role1') +
            ', ' +
            i18next.t('portfolioCard.role3') +
            ', ' +
            i18next.t('portfolioCard.role4'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM' +
            ', ' +
            'SEO',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type3'),
        url: 'https://fairpartner.pl/',
        img: img3,
        description: i18next.t('portfolioCard.description.description3'),
        timeToEndWork: '20' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 2,
        title: i18next.t('portfolioCard.title.title2'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2019',
        design: '-',
        role: i18next.t('portfolioCard.role1'),
        tag:
            'HTML' +
            ', ' +
            'CSS' +
            ', ' +
            'JS' +
            ', ' +
            'jQuery' +
            ', ' +
            'BEM',
        platform: i18next.t('portfolioCard.platform2'),
        type: i18next.t('portfolioCard.type2'),
        url: i18next.t('portfolioCard.urlNotAviable'),
        img: img2,
        description: i18next.t('portfolioCard.description.description2'),
        timeToEndWork: '10' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
    {
        id: 1,
        title: i18next.t('portfolioCard.title.title1'),
        subTitle: i18next.t('portfolioCard.subTitle'),
        year: '2019',
        design: '-',
        role: i18next.t('portfolioCard.role1'),
        tag: 'HTML' + ', ' + 'CSS',
        platform: i18next.t('portfolioCard.platform1'),
        type: i18next.t('portfolioCard.type2'),
        url: i18next.t('portfolioCard.urlNotAviable'),
        img: img1,
        description: i18next.t('portfolioCard.description.description1'),
        timeToEndWork: '10' + ' ' + i18next.t('portfolioCard.timeWork.Hours2'),
    },
];

export default portfolioCard;
