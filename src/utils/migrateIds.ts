import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    setDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

interface MigrationCallbacks {
    onProgress?: (message: string, details?: string) => void;
    onStepComplete?: (message: string, details?: string) => void;
    onError?: (message: string, details?: string) => void;
}

export const migratePortfolioIds = async (callbacks?: MigrationCallbacks) => {
    const { onProgress, onStepComplete, onError } = callbacks || {};

    try {
        onProgress?.('🔄 Початок міграції ID портфоліо...');

        // Отримуємо всі існуючі проекти
        onProgress?.('📊 Отримання існуючих проектів...');
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

        onStepComplete?.(
            `📊 Знайдено ${existingProjects.length} проектів для міграції`,
            `Проекти: ${existingProjects.map((p) => p.oldId).join(', ')}`,
        );

        if (existingProjects.length === 0) {
            onStepComplete?.('ℹ️ Немає проектів для міграції');
            return {
                success: true,
                message: 'Немає проектів для міграції',
            };
        }

        // Сортуємо за роком (новіші спочатку)
        onProgress?.('🔄 Сортування проектів за роком...');
        existingProjects.sort((a, b) => (b.year || 0) - (a.year || 0));
        onStepComplete?.('✅ Проекти відсортовані за роком (новіші спочатку)');

        // Присвоюємо нові числові ID
        let migratedCount = 0;
        let skippedCount = 0;

        for (let i = 0; i < existingProjects.length; i++) {
            const project = existingProjects[i];
            const newNumericId = i + 1;

            onProgress?.(
                `🔄 Обробка проекту ${i + 1}/${existingProjects.length}`,
                `Проект: ${project.title || project.oldId} -> ID: ${newNumericId}`,
            );

            // Якщо проект уже має правильний числовий ID, пропускаємо
            if (
                !isNaN(parseInt(project.oldId)) &&
                project.numericId === newNumericId
            ) {
                onStepComplete?.(
                    `✅ Проект ${project.oldId} вже має правильний ID`,
                    `ID: ${newNumericId} залишається без змін`,
                );
                skippedCount++;
                continue;
            }

            try {
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
                    const oldDocRef = doc(
                        db,
                        'portfolioCardData',
                        project.oldId,
                    );
                    await deleteDoc(oldDocRef);
                    onStepComplete?.(
                        `🔄 Проект мігровано: ${project.oldId} -> ${newNumericId}`,
                        `Старий документ видалено, створено новий з ID: ${newNumericId}`,
                    );
                } else {
                    onStepComplete?.(
                        `✅ Проект оновлено: ID ${newNumericId}`,
                        `Додано numericId поле до існуючого документа`,
                    );
                }

                migratedCount++;
            } catch (error) {
                const errorMsg = `Помилка міграції проекту ${project.oldId}`;
                const errorDetails =
                    error instanceof Error ? error.message : 'Невідома помилка';
                onError?.(errorMsg, errorDetails);
                console.error(errorMsg, error);
            }
        }

        const summaryMessage = `Мігровано ${migratedCount} проектів, пропущено ${skippedCount}`;
        onStepComplete?.('✅ Міграція завершена успішно!', summaryMessage);

        return {
            success: true,
            message: summaryMessage,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Невідома помилка';
        onError?.('❌ Помилка міграції', errorMessage);
        console.error('❌ Помилка міграції:', error);
        return {
            success: false,
            error: errorMessage,
        };
    }
};
