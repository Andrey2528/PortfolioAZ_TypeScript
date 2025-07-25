import { db } from '../utils/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Функція для отримання портфоліо проектів
export const fetchPortfolioData = async () => {
    try {
        const portfolioCollection = collection(db, 'portfolio');
        const snapshot = await getDocs(portfolioCollection);

        const portfolioData = [];
        snapshot.forEach((doc) => {
            portfolioData.push({
                id: doc.id,
                ...doc.data(),
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
            console.log('No profile data found');
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
    return portfolioData.map((item) => ({
        id: item.id,
        title: item.title || {},
        description: item.description || {},
        technologies: item.technologies || [],
        image: item.image || '',
        liveUrl: item.liveUrl || '',
        githubUrl: item.githubUrl || '',
        category: item.category || 'web',
        featured: item.featured || false,
        createdAt: item.createdAt || new Date(),
    }));
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
