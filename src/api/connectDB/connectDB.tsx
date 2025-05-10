import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import portfolioCardDB from '../db/portfolioCardDB';

const uploadPortfolioToFirestore = async () => {
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

export default uploadPortfolioToFirestore;
