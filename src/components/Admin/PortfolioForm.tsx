import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPortfolioCardFull } from '../../shared/interface/interfaceCard';
import {
    addPortfolioCard,
    updatePortfolioCard,
} from '../../api/connectDB/adminAPI';
import GitHubImageUploader from './GitHubImageUploader';
import TranslatedTitle from './TranslatedTitle';
import FieldPreview from './FieldPreview';

interface PortfolioFormProps {
    editingCard?: IPortfolioCardFull;
    onSuccess: () => void;
    onCancel: () => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
    editingCard,
    onSuccess,
    onCancel,
}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<Partial<IPortfolioCardFull>>({
        id: editingCard?.id || '',
        title: editingCard?.title || '',
        subTitle: editingCard?.subTitle || '',
        img: editingCard?.img || '',
        year: editingCard?.year || new Date().getFullYear(),
        design: editingCard?.design || '',
        role: editingCard?.role || '',
        tag: editingCard?.tag || '',
        platform: editingCard?.platform || '',
        type: editingCard?.type || [],
        url: editingCard?.url || '',
        description: editingCard?.description || '',
        timeToEndWork: editingCard?.timeToEndWork || '',
        company: editingCard?.company || '',
        data: editingCard?.data || new Date().toISOString().split('T')[0],
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Очистить ошибку для этого поля
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const types = value
            .split(',')
            .map((type) => type.trim())
            .filter((type) => type);
        setFormData((prev) => ({
            ...prev,
            type: types,
        }));
    };

    const handleImageUpload = (imageUrl: string) => {
        setFormData((prev) => ({
            ...prev,
            img: imageUrl,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title?.trim()) {
            newErrors.title = 'Название обязательно';
        }

        if (!formData.subTitle?.trim()) {
            newErrors.subTitle = 'Подзаголовок обязателен';
        }

        if (!formData.img?.trim()) {
            newErrors.img = 'Изображение обязательно';
        }

        if (!formData.description?.trim()) {
            newErrors.description = 'Описание обязательно';
        }

        if (!formData.company?.trim()) {
            newErrors.company = 'Компания обязательна';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const cardData = {
                ...formData,
                year: Number(formData.year),
            } as Omit<IPortfolioCardFull, 'id'>;

            if (editingCard) {
                // Обновление существующей записи
                await updatePortfolioCard(editingCard.id, cardData);
            } else {
                // Добавление новой записи
                await addPortfolioCard(cardData);
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving portfolio card:', error);
            alert('Ошибка при сохранении. Попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="portfolio-form" onSubmit={handleSubmit}>
            <h2>
                {editingCard ? 'Редактировать работу' : 'Добавить новую работу'}
            </h2>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        Название работы * <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        className={errors.title ? 'error' : ''}
                        placeholder="portfolio.project1.title"
                    />
                    {formData.title && (
                        <div
                            style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                background: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.3)',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            <strong>Предварительный просмотр:</strong>{' '}
                            <TranslatedTitle titleKey={formData.title} />
                        </div>
                    )}
                    {errors.title && (
                        <span className="error-text">{errors.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        Подзаголовок * <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="subTitle"
                        value={formData.subTitle || ''}
                        onChange={handleInputChange}
                        className={errors.subTitle ? 'error' : ''}
                        placeholder="portfolio.project1.subtitle"
                    />
                    {formData.subTitle && (
                        <div
                            style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                background: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.3)',
                                borderRadius: '4px',
                                fontSize: '14px',
                            }}
                        >
                            <strong>Предварительный просмотр:</strong>{' '}
                            <TranslatedTitle titleKey={formData.subTitle} />
                        </div>
                    )}
                    {errors.subTitle && (
                        <span className="error-text">{errors.subTitle}</span>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Изображение *</label>
                <GitHubImageUploader
                    currentImage={formData.img}
                    onImageUpload={handleImageUpload}
                />
                {errors.img && <span className="error-text">{errors.img}</span>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Год</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleInputChange}
                        min="2000"
                        max={new Date().getFullYear() + 1}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Компания * <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company || ''}
                        onChange={handleInputChange}
                        className={errors.company ? 'error' : ''}
                        placeholder="companies.google"
                    />
                    <FieldPreview
                        value={formData.company || ''}
                        fieldName="Компания"
                        isTranslationKey={true}
                    />
                    {errors.company && (
                        <span className="error-text">{errors.company}</span>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        Роль <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role || ''}
                        onChange={handleInputChange}
                        placeholder="roles.frontend_developer"
                    />
                    <FieldPreview
                        value={formData.role || ''}
                        fieldName="Роль"
                        isTranslationKey={true}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Платформа <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="platform"
                        value={formData.platform || ''}
                        onChange={handleInputChange}
                        placeholder="platforms.web"
                    />
                    <FieldPreview
                        value={formData.platform || ''}
                        fieldName="Платформа"
                        isTranslationKey={true}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        Тег <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="tag"
                        value={formData.tag || ''}
                        onChange={handleInputChange}
                        placeholder="tags.web_development"
                    />
                    <FieldPreview
                        value={formData.tag || ''}
                        fieldName="Тег"
                        isTranslationKey={true}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Дизайн <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="design"
                        value={formData.design || ''}
                        onChange={handleInputChange}
                        placeholder="designs.minimal_ui"
                    />
                    <FieldPreview
                        value={formData.design || ''}
                        fieldName="Дизайн"
                        isTranslationKey={true}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>
                    Типы (через запятую) <small>(ключи перевода)</small>
                </label>
                <input
                    type="text"
                    value={formData.type?.join(', ') || ''}
                    onChange={handleTypeChange}
                    placeholder="types.frontend, types.backend, types.design"
                />
                <FieldPreview
                    value={formData.type?.join(', ') || ''}
                    fieldName="Типы"
                    isTranslationKey={true}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>
                        URL проекта <small>(необов'язково)</small>
                    </label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url || ''}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                    />
                    <FieldPreview
                        value={formData.url || ''}
                        fieldName="URL"
                        isTranslationKey={false}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Время выполнения <small>(ключ перевода)</small>
                    </label>
                    <input
                        type="text"
                        name="timeToEndWork"
                        value={formData.timeToEndWork || ''}
                        onChange={handleInputChange}
                        placeholder="timeframes.two_months"
                    />
                    <FieldPreview
                        value={formData.timeToEndWork || ''}
                        fieldName="Время выполнения"
                        isTranslationKey={true}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Дата</label>
                <input
                    type="date"
                    name="data"
                    value={formData.data || ''}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>
                    Описание * <small>(ключ перевода)</small>
                </label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className={errors.description ? 'error' : ''}
                    placeholder="portfolio.project1.description"
                />
                <FieldPreview
                    value={formData.description || ''}
                    fieldName="Описание"
                    isTranslationKey={true}
                />
                {errors.description && (
                    <span className="error-text">{errors.description}</span>
                )}
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} disabled={loading}>
                    Отмена
                </button>
                <button type="submit" disabled={loading}>
                    {loading
                        ? 'Сохранение...'
                        : editingCard
                          ? 'Обновить'
                          : 'Добавить'}
                </button>
            </div>
        </form>
    );
};

export default PortfolioForm;
