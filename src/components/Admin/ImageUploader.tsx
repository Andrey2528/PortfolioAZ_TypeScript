import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
    currentImage?: string;
    onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    currentImage,
    onImageUpload,
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Imgur API key - в реальном проекте лучше хранить в переменных окружения
    const IMGUR_CLIENT_ID =
        import.meta.env.VITE_IMGUR_CLIENT_ID || 'your_imgur_client_id';

    const uploadToImgur = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image to Imgur');
        }

        const data = await response.json();
        return data.data.link;
    };

    const handleFileSelect = async (file: File) => {
        if (!file) return;

        // Проверка типа файла
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        // Проверка размера файла (максимум 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер: 10MB');
            return;
        }

        setUploading(true);

        try {
            const imageUrl = await uploadToImgur(file);
            onImageUpload(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Ошибка при загрузке изображения. Попробуйте еще раз.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value.trim();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            onImageUpload(url);
        }
    };

    return (
        <div className="image-uploader">
            {currentImage && (
                <div className="current-image">
                    <img src={currentImage} alt="Current" />
                    <button
                        type="button"
                        onClick={() => onImageUpload('')}
                        className="remove-image"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div
                className={`upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
            >
                {uploading ? (
                    <div className="uploading-state">
                        <div className="spinner"></div>
                        <span>Загрузка на Imgur...</span>
                    </div>
                ) : (
                    <div className="upload-content">
                        <div className="upload-icon">📁</div>
                        <div className="upload-text">
                            <p>
                                Перетащите изображение сюда или кликните для
                                выбора
                            </p>
                            <small>
                                Поддерживаемые форматы: JPG, PNG, GIF (максимум
                                10MB)
                            </small>
                        </div>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />

            <div className="url-input-section">
                <label>Или введите URL изображения:</label>
                <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    onBlur={handleUrlInput}
                />
            </div>

            <div className="upload-tips">
                <p>
                    <strong>Советы:</strong>
                </p>
                <ul>
                    <li>
                        Используйте изображения в высоком разрешении (минимум
                        800x600px)
                    </li>
                    <li>Оптимальное соотношение сторон: 16:9 или 4:3</li>
                    <li>Изображения автоматически загружаются на Imgur</li>
                </ul>
            </div>
        </div>
    );
};

export default ImageUploader;
