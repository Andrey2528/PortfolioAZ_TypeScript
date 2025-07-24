import React, { useState, useRef } from 'react';
import { FirebaseImageUploader } from '../../utils/firebaseImageUploader';

interface ImageUploaderProps {
    currentImage?: string;
    onImageUpload: (imageUrl: string) => void;
}

type UploadService = 'firebase' | 'imgur' | 'cloudinary';

const ImageUploader: React.FC<ImageUploaderProps> = ({
    currentImage,
    onImageUpload,
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [uploadService, setUploadService] =
        useState<UploadService>('firebase');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Imgur API key
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

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Cloudinary configuration missing');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            },
        );

        if (!response.ok) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        const data = await response.json();
        return data.secure_url;
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
            let imageUrl: string;

            switch (uploadService) {
                case 'firebase':
                    // Оптимизируем изображение перед загрузкой
                    const optimizedFile =
                        await FirebaseImageUploader.optimizeImage(file);
                    const result = await FirebaseImageUploader.uploadImage(
                        optimizedFile,
                        'portfolio',
                    );
                    imageUrl = result.url;
                    break;

                case 'imgur':
                    imageUrl = await uploadToImgur(file);
                    break;

                case 'cloudinary':
                    imageUrl = await uploadToCloudinary(file);
                    break;

                default:
                    throw new Error('Неподдерживаемый сервис загрузки');
            }

            onImageUpload(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(
                `Ошибка при загрузке изображения на ${uploadService}. Попробуйте еще раз.`,
            );
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

            <div className="upload-service-selector">
                <label>Сервис для загрузки:</label>
                <div className="service-options">
                    <label className="service-option">
                        <input
                            type="radio"
                            value="firebase"
                            checked={uploadService === 'firebase'}
                            onChange={(e) =>
                                setUploadService(
                                    e.target.value as UploadService,
                                )
                            }
                        />
                        <span>Firebase Storage (рекомендовано)</span>
                    </label>
                    <label className="service-option">
                        <input
                            type="radio"
                            value="imgur"
                            checked={uploadService === 'imgur'}
                            onChange={(e) =>
                                setUploadService(
                                    e.target.value as UploadService,
                                )
                            }
                        />
                        <span>Imgur</span>
                    </label>
                    <label className="service-option">
                        <input
                            type="radio"
                            value="cloudinary"
                            checked={uploadService === 'cloudinary'}
                            onChange={(e) =>
                                setUploadService(
                                    e.target.value as UploadService,
                                )
                            }
                        />
                        <span>Cloudinary</span>
                    </label>
                </div>
            </div>

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
                        <span>Загрузка на {uploadService}...</span>
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
                    <strong>Сравнение сервисов:</strong>
                </p>
                <ul>
                    <li>
                        <strong>Firebase Storage:</strong> Быстрый CDN,
                        оптимизация изображений, интеграция с проектом
                    </li>
                    <li>
                        <strong>Imgur:</strong> Простой, бесплатный, но может
                        блокироваться
                    </li>
                    <li>
                        <strong>Cloudinary:</strong> Профессиональный,
                        автооптимизация, трансформации
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ImageUploader;
