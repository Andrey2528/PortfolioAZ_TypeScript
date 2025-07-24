import React, { useState, useRef } from 'react';

interface LocalImageUploaderProps {
    currentImage?: string;
    onImageUpload: (imageUrl: string) => void;
}

const LocalImageUploader: React.FC<LocalImageUploaderProps> = ({
    currentImage,
    onImageUpload,
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadToLocal = async (file: File): Promise<string> => {
        // Створюємо унікальне ім'я файлу
        const timestamp = Date.now();
        const fileName = `portfolio_${timestamp}_${file.name}`;

        // Конвертуємо файл в data URL (base64)
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Будь ласка, виберіть файл зображення');
            return;
        }

        // Перевіряємо розмір файлу (макс 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Розмір файлу не повинен перевищувати 5MB');
            return;
        }

        setUploading(true);
        try {
            const imageUrl = await uploadToLocal(file);
            onImageUpload(imageUrl);

            // Показуємо повідомлення про успішне завантаження
            console.log('Зображення завантажено локально');
        } catch (error) {
            console.error('Помилка завантаження:', error);
            alert(
                `Помилка завантаження: ${error instanceof Error ? error.message : 'Невідома помилка'}`,
            );
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    return (
        <div className="image-uploader">
            <div
                className={`upload-area ${dragOver ? 'drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
            >
                {currentImage ? (
                    <div className="current-image">
                        <img src={currentImage} alt="Поточне зображення" />
                        <div className="upload-overlay">
                            <span>Клікніть або перетягніть для зміни</span>
                        </div>
                    </div>
                ) : (
                    <div className="upload-placeholder">
                        <div className="upload-icon">📁</div>
                        <p>
                            {uploading
                                ? 'Завантаження...'
                                : 'Клікніть або перетягніть зображення'}
                        </p>
                        <small>Максимальний розмір: 5MB</small>
                        <small>
                            Зображення зберігаються локально в проекті
                        </small>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
            />

            {uploading && (
                <div className="upload-progress">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            )}

            <div className="upload-info">
                <small style={{ color: '#94a3b8', fontSize: '12px' }}>
                    💡 Зображення зберігаються як base64 в базі даних.
                    <br />
                    Для продакшену рекомендується використовувати зовнішній
                    сервіс.
                </small>
            </div>
        </div>
    );
};

export default LocalImageUploader;
