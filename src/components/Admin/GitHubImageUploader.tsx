import React, { useState, useRef } from 'react';

interface GitHubImageUploaderProps {
    currentImage?: string;
    onImageUpload: (imageUrl: string) => void;
}

const GitHubImageUploader: React.FC<GitHubImageUploaderProps> = ({
    currentImage,
    onImageUpload,
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // GitHub API налаштування
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
    const GITHUB_REPO =
        import.meta.env.VITE_GITHUB_REPO || 'Andrey2528/PortfolioAZ_TypeScript';

    const uploadToGitHub = async (file: File): Promise<string> => {
        // Перетворюємо файл в base64
        const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(',')[1]); // Видаляємо data:image/...;base64,
            };
            reader.readAsDataURL(file);
        });

        // Генеруємо унікальне ім'я файлу
        const timestamp = Date.now();
        const fileName = `portfolio_${timestamp}_${file.name}`;
        const path = `src/assets/images/uploaded/${fileName}`;

        // Завантажуємо файл в GitHub репозиторій
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Add portfolio image: ${fileName}`,
                    content: base64,
                    branch: 'master',
                }),
            },
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                `GitHub upload failed: ${error.message || 'Unknown error'}`,
            );
        }

        const result = await response.json();

        // Повертаємо URL для прямого доступу до зображення
        return `https://raw.githubusercontent.com/${GITHUB_REPO}/master/${path}`;
    };

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Будь ласка, виберіть файл зображення');
            return;
        }

        // Перевіряємо розмір файлу (макс 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Розмір файлу не повинен перевищувати 2MB');
            return;
        }

        setUploading(true);
        try {
            const imageUrl = await uploadToGitHub(file);
            onImageUpload(imageUrl);
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
                        <small>Максимальний розмір: 2MB</small>
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
        </div>
    );
};

export default GitHubImageUploader;
