import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
//import portfolioCardDB from '../db/portfolioCardDB';
import certificateDB from '../db/certificateDB';

export const uploadPortfolioToFirestore = async () => {
    try {
        const existingDocsSnapshot = await getDocs(
            collection(db, 'portfolioCardData'),
        );
        const existingTitles = existingDocsSnapshot.docs.map(
            (doc) => doc.data().title,
        );
        for (const card of portfolioCardDB) {
            const id = card.id;

            if (existingTitles.includes(id)) {
                console.log(
                    `Card with title ${id} already exists. Skipping...`,
                );
                continue;
            }
            // Замінити локальні дані на “чисті”
            const cleanCard = {
                ...card,
                title: `portfolioCard.title.title${id}`,
                subTitle: 'portfolioCard.subTitle',
                year: card.year,
                design: card.design,
                role: `portfolioCard.role${id}`,
                tag: card.tag,
                platform: `portfolioCard.platform${id}`,
                type: 'portfolioCard.type2',
                url: typeof card.url === 'string' ? card.url : 'N/A',
                img: card.img,
                description: `portfolioCard.description.description${id}`,
                timeToEndWork: {
                    value: 10,
                    unit: 'portfolioCard.timeWork.Hours2',
                },
            };

            await addDoc(collection(db, 'portfolioCardData'), cleanCard);
            console.log(`Uploaded card with id: ${card.id}`);
        }
    } catch (error) {
        console.error('Error uploading portfolio:', error);
    }
};

export const uploadSertificateToFirestore = async () => {
    try {
        const existingDocsSnapshot = await getDocs(
            collection(db, 'sertificateData'),
        );
        const existingTitles = existingDocsSnapshot.docs.map(
            (doc) => doc.data().title,
        );
        for (const sert of certificateDB) {
            const id = sert.id;

            if (existingTitles.includes(id)) {
                console.log(
                    `sert with title ${id} already exists. Skipping...`,
                );
                continue;
            }
            // Замінити локальні дані на “чисті”
            const cleanSertificate = {
                ...sert,
                title: `certificate.title.title${id}`,
                subTitle: 'certificate.subTitle',
                date: sert.date,
                company: sert.company,
                img: sert.img,
            };

            await addDoc(collection(db, 'sertificateData'), cleanSertificate);
            console.log(`Uploaded sert with id: ${sert.id}`);
        }
    } catch (error) {
        console.error('Error uploading portfolio:', error);
    }
};

/*

import { useEffect } from 'react';
import { uploadSertificateToFirestore } from '@/api/connectDB/connectDB';

    useEffect(() => {
        let uploaded = false;
        if (!uploaded) {
            uploadSertificateToFirestore();
            uploaded = true;
        }
    }, []);

*/
