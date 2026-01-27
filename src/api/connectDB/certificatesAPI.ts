import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import {
    IFirebaseCertificate,
    INormalizedCertificate,
} from '@/shared/interface/Certificate.interface';
import { cacheManager, CACHE_TTL } from '@/utils/cacheManager';

// Функція для завантаження сертифікатів з Firebase з кешуванням
export const fetchFirebaseCertificates = async (): Promise<
    IFirebaseCertificate[]
> => {
    try {
        return await cacheManager.wrap(
            'firebase_certificates',
            async () => {
                const querySnapshot = await getDocs(
                    collection(db, 'sertificateData'),
                );
                const certificates: IFirebaseCertificate[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    certificates.push({
                        id: data.id || doc.id,
                        title: data.title || '',
                        subTitle: data.subTitle || '',
                        img: data.img || '',
                        company: data.company || '',
                        date: data.date || '',
                    });
                });

                console.log('📊 Raw Firebase certificates:', certificates);
                return certificates;
            },
            { ttl: CACHE_TTL.MEDIUM }, // Кешуємо на 30 хвилин
        );
    } catch (error) {
        console.error('❌ Error fetching certificates from Firebase:', error);
        return [];
    }
};

// Функція для нормалізації сертифікатів
export const normalizeCertificates = (
    certificates: IFirebaseCertificate[],
): INormalizedCertificate[] => {
    return certificates.map((cert) => ({
        id: String(cert.id),
        title: cert.title, // Переклад буде виконуватися в компоненті через t()
        subTitle: cert.subTitle,
        img: cert.img,
        company: cert.company,
        date: cert.date,
    }));
};
