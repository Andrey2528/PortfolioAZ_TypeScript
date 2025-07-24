import {
    addCertificate,
    addSkill,
    addSocialLink,
} from '../api/connectDB/dataAPI';
import { addPortfolioCard } from '../api/connectDB/adminAPI';
import { db } from './firebase';

// Дані портфоліо
const portfolioData = [
    {
        numericId: 1,
        title: 'portfolioCard.title.title12',
        subTitle: 'portfolioCard.subTitle',
        year: 2025,
        design: '+',
        role: 'portfolioCard.role1',
        tag: 'React.js, SCSS, JS, BEM',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type2'],
        url: 'https://andrey2528.github.io/GrillCalc/',
        img: 'https://example.com/portfolioImg12.png',
        description: 'portfolioCard.description.description12',
        timeToEndWork: '3 portfolioCard.timeWork.Hours1',
        company: 'portfolioCard.company1',
        data: '2025-01-01',
    },
    {
        numericId: 2,
        title: 'portfolioCard.title.title11',
        subTitle: 'portfolioCard.subTitle',
        year: 2025,
        design: '-',
        role: 'portfolioCard.role1',
        tag: 'React.js, SCSS, JS, BEM, SEO',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type3'],
        url: 'https://andrey2528.github.io/PortfolioAZ/#/',
        img: 'https://example.com/portfolioImg11.png',
        description: 'portfolioCard.description.description11',
        timeToEndWork: '20 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2025-01-01',
    },
    {
        numericId: 3,
        title: 'portfolioCard.title.title9',
        subTitle: 'portfolioCard.subTitle',
        year: 2024,
        design: '-',
        role: 'portfolioCard.role1',
        tag: 'HTML, CSS, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform1',
        type: ['portfolioCard.type3'],
        url: 'portfolioCard.urlNotAviable',
        img: 'https://example.com/portfolioImg9.png',
        description: 'portfolioCard.description.description9',
        timeToEndWork: '30 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2024-01-01',
    },
    {
        numericId: 4,
        title: 'portfolioCard.title.title10',
        subTitle: 'portfolioCard.subTitle',
        year: 2023,
        design: '+',
        role: 'portfolioCard.role1',
        tag: 'HTML, CSS, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform1',
        type: ['portfolioCard.type3'],
        url: 'https://andrey2528.github.io/1_drop_socks/',
        img: 'https://example.com/portfolioImg10.png',
        description: 'portfolioCard.description10',
        timeToEndWork: '7 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2023-01-01',
    },
    {
        numericId: 5,
        title: 'portfolioCard.title.title8',
        subTitle: 'portfolioCard.description.subTitle',
        year: 2023,
        design: '-',
        role: 'portfolioCard.role1',
        tag: 'HTML, CSS, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform1',
        type: ['portfolioCard.type3'],
        url: 'http://sketch2site.com',
        img: 'https://example.com/portfolioImg8.png',
        description: 'portfolioCard.description.description8',
        timeToEndWork: '30 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2023-01-01',
    },
    {
        numericId: 6,
        title: 'portfolioCard.title.title7 portfolioCard.old',
        subTitle: 'portfolioCard.subTitle',
        year: 2023,
        design: '-',
        role: 'portfolioCard.role1, portfolioCard.role2',
        tag: 'HTML, CSS, PHP, WordPress, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type1'],
        url: 'http://batumikarting.ge',
        img: 'https://example.com/portfolioImg7.png',
        description: 'portfolioCard.description.description7',
        timeToEndWork: '200 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2023-01-01',
    },
    {
        numericId: 7,
        title: 'portfolioCard.title.title6',
        subTitle: 'portfolioCard.subTitle',
        year: 2022,
        design: '-',
        role: 'portfolioCard.role1, portfolioCard.role3, portfolioCard.role4',
        tag: 'HTML, SCSS, JS, React.js, BEM',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type2'],
        url: 'portfolioCard.urlNotAviable',
        img: 'https://example.com/portfolioImg6.png',
        description: 'portfolioCard.description.description6',
        timeToEndWork: '15 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2022-01-01',
    },
    {
        numericId: 8,
        title: 'portfolioCard.title.title5',
        subTitle: 'portfolioCard.subTitle',
        year: 2022,
        design: '-',
        role: 'portfolioCard.role1, portfolioCard.role3, portfolioCard.role4',
        tag: 'HTML, CSS, PHP, WordPress, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type3'],
        url: '',
        img: 'https://example.com/portfolioImg5.png',
        description: 'portfolioCard.description.description5',
        timeToEndWork: '100 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2022-01-01',
    },
    {
        numericId: 9,
        title: 'portfolioCard.title.title4',
        subTitle: 'portfolioCard.subTitle',
        year: 2022,
        design: '-',
        role: 'portfolioCard.role1, portfolioCard.role3',
        tag: 'HTML, CSS, JS, jQuery, BEM',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type2'],
        url: 'https://andrey2528.github.io/people-taback/',
        img: 'https://example.com/portfolioImg4.png',
        description: 'portfolioCard.description.description4',
        timeToEndWork: '9 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2022-01-01',
    },
    {
        numericId: 10,
        title: 'portfolioCard.title.title3',
        subTitle: 'portfolioCard.subTitle',
        year: 2022,
        design: '-',
        role: 'portfolioCard.role1, portfolioCard.role3, portfolioCard.role4',
        tag: 'HTML, CSS, JS, jQuery, BEM, SEO',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type3'],
        url: 'https://fairpartner.pl/',
        img: 'https://example.com/portfolioImg3.png',
        description: 'portfolioCard.description.description3',
        timeToEndWork: '20 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2022-01-01',
    },
    {
        numericId: 11,
        title: 'portfolioCard.title.title2',
        subTitle: 'portfolioCard.subTitle',
        year: 2019,
        design: '-',
        role: 'portfolioCard.role1',
        tag: 'HTML, CSS, JS, jQuery, BEM',
        platform: 'portfolioCard.platform2',
        type: ['portfolioCard.type2'],
        url: 'portfolioCard.urlNotAviable',
        img: 'https://example.com/portfolioImg2.png',
        description: 'portfolioCard.description.description2',
        timeToEndWork: '10 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2019-01-01',
    },
    {
        numericId: 12,
        title: 'portfolioCard.title.title1',
        subTitle: 'portfolioCard.subTitle',
        year: 2019,
        design: '-',
        role: 'portfolioCard.role1',
        tag: 'HTML, CSS',
        platform: 'portfolioCard.platform1',
        type: ['portfolioCard.type2'],
        url: 'portfolioCard.urlNotAviable',
        img: 'https://example.com/portfolioImg1.png',
        description: 'portfolioCard.description.description1',
        timeToEndWork: '10 portfolioCard.timeWork.Hours2',
        company: 'portfolioCard.company1',
        data: '2019-01-01',
    },
];

// Дані сертифікатів
const certificatesData = [
    {
        title: 'certificate.title9',
        date: '2023-05-26',
        img: 'https://example.com/certificateWeb4.png',
    },
    {
        title: 'certificate.title8',
        date: '2022-03-20',
        img: 'https://example.com/certificateWeb3.png',
    },
    {
        title: 'certificate.title7',
        date: '2022-03-19',
        img: 'https://example.com/certificateWeb2.png',
    },
    {
        title: 'certificate.title6',
        date: '2022-01-11',
        img: 'https://example.com/certificateWeb1.png',
    },
    {
        title: 'certificate.title5',
        date: '2024-06-12',
        img: 'https://example.com/certificateBlockchain4.png',
    },
    {
        title: 'certificate.title4',
        date: '2024-06-12',
        img: 'https://example.com/certificateBlockchain3.png',
    },
    {
        title: 'certificate.title3',
        date: '2024-06-12',
        img: 'https://example.com/certificateBlockchain2.png',
    },
    {
        title: 'certificate.title2',
        date: '2024-06-12',
        img: 'https://example.com/certificateBlockchain1.png',
    },
    {
        title: 'certificate.title1',
        date: '2024-06-20',
        img: 'https://example.com/certificateMarketing.png',
    },
];

// Дані навичок
const skillsData = [
    { title: 'InfoPage.skills.skillsText5' },
    { title: 'InfoPage.skills.skillsText4' },
    { title: 'InfoPage.skills.skillsText3' },
    { title: 'InfoPage.skills.skillsText2' },
    { title: 'InfoPage.skills.skillsText1' },
];

// Дані соціальних посилань
const socialLinksData = [
    {
        title: 'Instagram',
        link: '@andryi.zhukov',
    },
    {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B4%D1%80%D1%96%D0%B9-%D0%B6%D1%83%D0%BA%D0%BE%D0%B2-b569ab29a/',
    },
    {
        title: 'Github',
        link: 'https://github.com/Andrey2528',
    },
    {
        title: 'Telegram',
        link: 'https://t.me/Andruh_a',
    },
    {
        title: 'E-mail',
        link: 'zhukovandrey02@gmail.com',
    },
];

// Функція для завантаження всіх даних
export const seedInitialData = async () => {
    try {
        console.log('🌱 Початкове завантаження даних...');

        // Завантаження сертифікатів
        console.log('📜 Завантаження сертифікатів...');
        for (const cert of certificatesData) {
            await addCertificate(cert);
        }
        console.log(`✅ Завантажено ${certificatesData.length} сертифікатів`);

        // Завантаження навичок
        console.log('🎯 Завантаження навичок...');
        for (const skill of skillsData) {
            await addSkill(skill);
        }
        console.log(`✅ Завантажено ${skillsData.length} навичок`);

        // Завантаження соціальних посилань
        console.log('🔗 Завантаження соціальних посилань...');
        for (const socialLink of socialLinksData) {
            await addSocialLink(socialLink);
        }
        console.log(
            `✅ Завантажено ${socialLinksData.length} соціальних посилань`,
        );

        // Завантаження портфоліо
        console.log('💼 Завантаження портфоліо...');
        for (const item of portfolioData) {
            await addPortfolioCard(item);
        }
        console.log(`✅ Завантажено ${portfolioData.length} проектів`);

        console.log('🎉 Початкове завантаження даних завершено!');

        return {
            success: true,
            message: 'Всі дані успішно завантажені',
        };
    } catch (error) {
        console.error('❌ Помилка завантаження даних:', error);
        return {
            success: false,
            message: 'Помилка завантаження даних',
        };
    }
};

// Функція для завантаження портфоліо
export const seedPortfolioData = async () => {
    try {
        console.log('🌱 Початок завантаження портфоліо...');

        for (const item of portfolioData) {
            // Використовуємо спеціальну логіку для seed даних
            const { numericId, ...itemData } = item;
            if (numericId) {
                const { setDoc, doc } = await import('firebase/firestore');
                const docRef = doc(
                    db,
                    'portfolioCardData',
                    numericId.toString(),
                );
                await setDoc(docRef, { ...itemData, numericId });
            } else {
                await addPortfolioCard(itemData);
            }
        }

        console.log('✅ Портфоліо завантажено!');
        return {
            success: true,
            message: `Завантажено ${portfolioData.length} проектів`,
        };
    } catch (error) {
        console.error('❌ Помилка завантаження портфоліо:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Невідома помилка',
        };
    }
};

// Функція для завантаження конкретного типу даних
export const seedDataType = async (
    type: 'certificates' | 'skills' | 'social' | 'portfolio',
) => {
    try {
        switch (type) {
            case 'certificates':
                for (const cert of certificatesData) {
                    await addCertificate(cert);
                }
                break;
            case 'skills':
                for (const skill of skillsData) {
                    await addSkill(skill);
                }
                break;
            case 'social':
                for (const socialLink of socialLinksData) {
                    await addSocialLink(socialLink);
                }
                break;
            case 'portfolio':
                for (const item of portfolioData) {
                    await addPortfolioCard(item);
                }
                break;
        }
        return { success: true };
    } catch (error) {
        console.error(`Помилка завантаження ${type}:`, error);
        return { success: false, error };
    }
};
