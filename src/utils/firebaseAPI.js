import { db } from '../utils/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Функція для отримання портфоліо проектів
export const fetchPortfolioData = async () => {
    try {
        const portfolioCollection = collection(db, 'portfolioCardData');
        const snapshot = await getDocs(portfolioCollection);

        const portfolioData = [];
        snapshot.forEach((doc) => {
            const docData = doc.data();
            portfolioData.push({
                id: doc.id,
                ...docData,
            });
        });
        return portfolioData;
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return [];
    }
};

// Функція для отримання сертифікатів
export const fetchCertificatesData = async () => {
    try {
        const certificatesCollection = collection(db, 'certificates');
        const snapshot = await getDocs(certificatesCollection);

        const certificatesData = [];
        snapshot.forEach((doc) => {
            certificatesData.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return certificatesData;
    } catch (error) {
        console.error('Error fetching certificates data:', error);
        return [];
    }
};

// Функція для отримання навичок
export const fetchSkillsData = async () => {
    try {
        const skillsCollection = collection(db, 'skills');
        const snapshot = await getDocs(skillsCollection);

        const skillsData = [];
        snapshot.forEach((doc) => {
            skillsData.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return skillsData;
    } catch (error) {
        console.error('Error fetching skills data:', error);
        return [];
    }
};

// Функція для отримання соціальних посилань
export const fetchSocialLinksData = async () => {
    try {
        const socialLinksCollection = collection(db, 'socialLinks');
        const snapshot = await getDocs(socialLinksCollection);

        const socialLinksData = [];
        snapshot.forEach((doc) => {
            socialLinksData.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return socialLinksData;
    } catch (error) {
        console.error('Error fetching social links data:', error);
        return [];
    }
};

// Функція для отримання інформації профілю
export const fetchProfileData = async () => {
    try {
        const profileDoc = doc(db, 'profile', 'main');
        const snapshot = await getDoc(profileDoc);

        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data(),
            };
        } else {
            // Немає даних профілю
            return null;
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }
};

// Функція для отримання всіх даних одразу
export const fetchAllData = async () => {
    try {
        const [portfolio, certificates, skills, socialLinks, profile] =
            await Promise.all([
                fetchPortfolioData(),
                fetchCertificatesData(),
                fetchSkillsData(),
                fetchSocialLinksData(),
                fetchProfileData(),
            ]);

        return {
            portfolio,
            certificates,
            skills,
            socialLinks,
            profile,
        };
    } catch (error) {
        console.error('Error fetching all data:', error);
        return {
            portfolio: [],
            certificates: [],
            skills: [],
            socialLinks: [],
            profile: null,
        };
    }
};

// Нормалізація даних портфоліо для використання в компонентах
export const normalizePortfolioData = (portfolioData) => {
    if (!portfolioData || !Array.isArray(portfolioData)) {
        return [];
    }

    const normalized = portfolioData.map((item, index) => {
        // Мапимо поля з Firebase структури на IPortfolioCardFull інтерфейс
        const normalized = {
            // Основні поля з IPortfolioCardPreview
            id: item.id,
            title: item.title || '', // Firebase: title -> Interface: title
            subTitle: item.subTitle || '', // Firebase: subTitle -> Interface: subTitle
            img: item.img || '', // Firebase: img -> Interface: img
            numericId: item.numericId || 0, // Firebase: numericId -> Interface: numericId

            // Додаткові поля з IPortfolioCardFull
            year: item.year || new Date().getFullYear(), // Firebase: year -> Interface: year
            design: item.design || '', // Firebase: design -> Interface: design
            role: item.role || '', // Firebase: role -> Interface: role
            tag: Array.isArray(item.tag) ? item.tag.join(', ') : item.tag || '', // Firebase: tag[] -> Interface: tag (string)
            platform: item.platform || '', // Firebase: platform -> Interface: platform
            type: item.type || [], // Firebase: type -> Interface: type[]
            url: item.url || '', // Firebase: url -> Interface: url
            description: item.description || '', // Firebase: description -> Interface: description
            timeToEndWork:
                typeof item.timeToEndWork === 'object'
                    ? `${item.timeToEndWork?.value || ''} ${item.timeToEndWork?.unit || ''}`.trim()
                    : item.timeToEndWork || '', // Firebase: timeToEndWork{} -> Interface: timeToEndWork (string)
            company: item.company || '', // Firebase: company -> Interface: company
            data: item.data || '', // Firebase: data -> Interface: data

            // Нормалізовані поля (опціональні)
            normalizedRole: item.role ? [item.role] : [],
            normalizedCompany: item.company || '',
        };

        return normalized;
    });
    return normalized;
};

// Нормалізація даних сертифікатів
export const normalizeCertificatesData = (certificatesData) => {
    return certificatesData.map((item) => ({
        id: item.id,
        title: item.title || {},
        description: item.description || {},
        image: item.image || '',
        issuer: item.issuer || '',
        issueDate: item.issueDate || '',
        credentialUrl: item.credentialUrl || '',
        category: item.category || 'general',
    }));
};

// Нормалізація даних навичок
export const normalizeSkillsData = (skillsData) => {
    return skillsData.map((item) => ({
        id: item.id,
        name: item.name || {},
        level: item.level || 0,
        category: item.category || 'technical',
        icon: item.icon || '',
        order: item.order || 0,
    }));
};
