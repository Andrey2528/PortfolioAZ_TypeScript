import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

export const migratePortfolioIds = async () => {
    try {
        console.log('🔄 Початок міграції ID портфоліо...');

        // Отримуємо всі існуючі проекти
        const querySnapshot = await getDocs(
            collection(db, 'portfolioCardData'),
        );
        const existingProjects: any[] = [];

        querySnapshot.forEach((doc) => {
            existingProjects.push({
                ...doc.data(),
                oldId: doc.id,
            });
        });

        console.log(
            `📊 Знайдено ${existingProjects.length} проектів для міграції`,
        );

        // Сортуємо за роком (новіші спочатку)
        existingProjects.sort((a, b) => (b.year || 0) - (a.year || 0));

        // Присвоюємо нові числові ID
        for (let i = 0; i < existingProjects.length; i++) {
            const project = existingProjects[i];
            const newNumericId = i + 1;

            // Якщо проект уже має правильний числовий ID, пропускаємо
            if (
                !isNaN(parseInt(project.oldId)) &&
                project.numericId === newNumericId
            ) {
                console.log(`✅ Проект ${project.oldId} вже має правильний ID`);
                continue;
            }

            // Створюємо новий документ з числовим ID
            const newDocRef = doc(
                db,
                'portfolioCardData',
                newNumericId.toString(),
            );
            const { oldId, ...projectData } = project;

            await setDoc(newDocRef, {
                ...projectData,
                numericId: newNumericId,
            });

            // Видаляємо старий документ (якщо ID різні)
            if (project.oldId !== newNumericId.toString()) {
                const oldDocRef = doc(db, 'portfolioCardData', project.oldId);
                await deleteDoc(oldDocRef);
                console.log(`🔄 Проект ${project.oldId} -> ${newNumericId}`);
            }
        }

        console.log('✅ Міграція завершена успішно!');
        return {
            success: true,
            message: `Мігровано ${existingProjects.length} проектів`,
        };
    } catch (error) {
        console.error('❌ Помилка міграції:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Невідома помилка',
        };
    }
};
