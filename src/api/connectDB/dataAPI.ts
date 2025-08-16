import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import {
    ICertificate,
    ISkill,
    ISocialLink,
    ISocialImage,
} from '../../shared/interface/Data.interface';

// Certificates API
export const getCertificates = async (): Promise<ICertificate[]> => {
    try {
        const q = query(
            collection(db, 'certificates'),
            orderBy('date', 'desc'),
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(
            (doc) =>
                ({
                    id: doc.data().id || parseInt(doc.id),
                    ...doc.data(),
                }) as ICertificate,
        );
    } catch (error) {
        console.error('Error getting certificates:', error);
        throw error;
    }
};

export const addCertificate = async (
    certificate: Omit<ICertificate, 'id'>,
): Promise<void> => {
    try {
        // Генеруємо новий ID
        const certificates = await getCertificates();
        const maxId =
            certificates.length > 0
                ? Math.max(...certificates.map((c) => c.id))
                : 0;
        const newCertificate = { ...certificate, id: maxId + 1 };

        await addDoc(collection(db, 'certificates'), newCertificate);
    } catch (error) {
        console.error('Error adding certificate:', error);
        throw error;
    }
};

export const updateCertificate = async (
    id: number,
    certificate: Partial<ICertificate>,
): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'certificates'));
        const docToUpdate = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToUpdate) {
            await updateDoc(
                doc(db, 'certificates', docToUpdate.id),
                certificate,
            );
        }
    } catch (error) {
        console.error('Error updating certificate:', error);
        throw error;
    }
};

export const deleteCertificate = async (id: number): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'certificates'));
        const docToDelete = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(doc(db, 'certificates', docToDelete.id));
        }
    } catch (error) {
        console.error('Error deleting certificate:', error);
        throw error;
    }
};

// Skills API
export const getSkills = async (): Promise<ISkill[]> => {
    try {
        const q = query(collection(db, 'skills'), orderBy('id', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(
            (doc) =>
                ({
                    id: doc.data().id || parseInt(doc.id),
                    ...doc.data(),
                }) as ISkill,
        );
    } catch (error) {
        console.error('Error getting skills:', error);
        throw error;
    }
};

export const addSkill = async (skill: Omit<ISkill, 'id'>): Promise<void> => {
    try {
        const skills = await getSkills();
        const maxId =
            skills.length > 0 ? Math.max(...skills.map((s) => s.id)) : 0;
        const newSkill = { ...skill, id: maxId + 1 };

        await addDoc(collection(db, 'skills'), newSkill);
    } catch (error) {
        console.error('Error adding skill:', error);
        throw error;
    }
};

export const updateSkill = async (
    id: number,
    skill: Partial<ISkill>,
): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'skills'));
        const docToUpdate = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToUpdate) {
            await updateDoc(doc(db, 'skills', docToUpdate.id), skill);
        }
    } catch (error) {
        console.error('Error updating skill:', error);
        throw error;
    }
};

export const deleteSkill = async (id: number): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'skills'));
        const docToDelete = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(doc(db, 'skills', docToDelete.id));
        }
    } catch (error) {
        console.error('Error deleting skill:', error);
        throw error;
    }
};

// Функція для очищення тестових навичок
export const cleanupTestSkills = async (): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'skills'));
        const docsToDelete = snapshot.docs.filter((doc) => {
            const data = doc.data();
            return (
                data.title &&
                (data.title.includes('InfoPage.skills.skillsText') ||
                    data.title.includes('skillsText') ||
                    data.title.trim().length === 0)
            );
        });

        // Видаляємо всі тестові навички
        const deletePromises = docsToDelete.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        console.log(`Видалено ${docsToDelete.length} тестових навичок`);
    } catch (error) {
        console.error('Error cleaning up test skills:', error);
        throw error;
    }
};

// Social Links API
export const getSocialLinks = async (): Promise<ISocialLink[]> => {
    try {
        const q = query(collection(db, 'socialLinks'), orderBy('id', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(
            (doc) =>
                ({
                    id: doc.data().id || parseInt(doc.id),
                    ...doc.data(),
                }) as ISocialLink,
        );
    } catch (error) {
        console.error('Error getting social links:', error);
        throw error;
    }
};

export const addSocialLink = async (
    socialLink: Omit<ISocialLink, 'id'>,
): Promise<void> => {
    try {
        const socialLinks = await getSocialLinks();
        const maxId =
            socialLinks.length > 0
                ? Math.max(...socialLinks.map((s) => s.id))
                : 0;
        const newSocialLink = { ...socialLink, id: maxId + 1 };

        await addDoc(collection(db, 'socialLinks'), newSocialLink);
    } catch (error) {
        console.error('Error adding social link:', error);
        throw error;
    }
};

export const updateSocialLink = async (
    id: number,
    socialLink: Partial<ISocialLink>,
): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'socialLinks'));
        const docToUpdate = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToUpdate) {
            await updateDoc(doc(db, 'socialLinks', docToUpdate.id), socialLink);
        }
    } catch (error) {
        console.error('Error updating social link:', error);
        throw error;
    }
};

export const deleteSocialLink = async (id: number): Promise<void> => {
    try {
        const snapshot = await getDocs(collection(db, 'socialLinks'));
        const docToDelete = snapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(doc(db, 'socialLinks', docToDelete.id));
        }
    } catch (error) {
        console.error('Error deleting social link:', error);
        throw error;
    }
};
