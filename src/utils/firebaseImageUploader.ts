import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

interface UploadResult {
    url: string;
    path: string;
}

export class FirebaseImageUploader {
    /**
     * Завантажує зображення в Firebase Storage
     */
    static async uploadImage(
        file: File,
        folder: string = 'portfolio',
    ): Promise<UploadResult> {
        try {
            // Генеруємо унікальне ім'я файлу
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const imagePath = `${folder}/${fileName}`;

            // Створюємо посилання на файл
            const storageRef = ref(storage, imagePath);

            // Завантажуємо файл
            const snapshot = await uploadBytes(storageRef, file);

            // Отримуємо URL для скачування
            const downloadURL = await getDownloadURL(snapshot.ref);

            return {
                url: downloadURL,
                path: imagePath,
            };
        } catch (error) {
            console.error('Error uploading image to Firebase Storage:', error);
            throw new Error('Помилка завантаження зображення');
        }
    }

    /**
     * Видаляє зображення з Firebase Storage
     */
    static async deleteImage(imagePath: string): Promise<void> {
        try {
            const storageRef = ref(storage, imagePath);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting image from Firebase Storage:', error);
            throw new Error('Помилка видалення зображення');
        }
    }

    /**
     * Оптимізує зображення перед завантаженням
     */
    static async optimizeImage(
        file: File,
        maxWidth: number = 1200,
        quality: number = 0.8,
    ): Promise<File> {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const img = new Image();

            img.onload = () => {
                // Розраховуємо нові розміри
                const ratio = Math.min(
                    maxWidth / img.width,
                    maxWidth / img.height,
                );
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                // Малюємо оптимізоване зображення
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const optimizedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(optimizedFile);
                        } else {
                            resolve(file);
                        }
                    },
                    'image/jpeg',
                    quality,
                );
            };

            img.src = URL.createObjectURL(file);
        });
    }
}
