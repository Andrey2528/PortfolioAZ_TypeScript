import React, { useState } from 'react';
import {
    ITranslation,
    ITranslationFormData,
} from '../../shared/interface/interfaceTranslation';
import {
    addTranslation,
    updateTranslation,
} from '../../api/connectDB/translationsAPI';

interface TranslationFormProps {
    editingTranslation?: ITranslation;
    onSuccess: () => void;
    onCancel: () => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
    editingTranslation,
    onSuccess,
    onCancel,
}) => {
    const [formData, setFormData] = useState<ITranslationFormData>({
        key: editingTranslation?.key || '',
        en: editingTranslation?.en || '',
        ru: editingTranslation?.ru || '',
        uk: editingTranslation?.uk || '',
        category: editingTranslation?.category || 'common',
        description: editingTranslation?.description || '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const categories = [
        'common',
        'portfolio',
        'navigation',
        'forms',
        'buttons',
        'errors',
        'success',
        'placeholders',
    ];

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

        // Очистити помилку для цього поля
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.key.trim()) {
            newErrors.key = "Ключ обов'язковий";
        } else if (!/^[a-zA-Z0-9_.]+$/.test(formData.key)) {
            newErrors.key =
                'Ключ може містити тільки букви, цифри, крапки та підкреслення';
        }

        if (!formData.en.trim()) {
            newErrors.en = "Англійський переклад обов'язковий";
        }

        if (!formData.ru.trim()) {
            newErrors.ru = "Російський переклад обов'язковий";
        }

        if (!formData.uk.trim()) {
            newErrors.uk = "Український переклад обов'язковий";
        }

        if (!formData.category.trim()) {
            newErrors.category = "Категорія обов'язкова";
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
            if (editingTranslation) {
                await updateTranslation(editingTranslation.id, formData);
            } else {
                await addTranslation(formData);
            }

            onSuccess();
        } catch (error) {
            console.error('Error saving translation:', error);
            alert('Помилка при збереженні. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="translation-form" onSubmit={handleSubmit}>
            <h2>
                {editingTranslation
                    ? 'Редагувати переклад'
                    : 'Додати новий переклад'}
            </h2>

            <div className="form-row">
                <div className="form-group">
                    <label>Ключ *</label>
                    <input
                        type="text"
                        name="key"
                        value={formData.key}
                        onChange={handleInputChange}
                        placeholder="portfolioCard.title.title1"
                        className={errors.key ? 'error' : ''}
                    />
                    {errors.key && (
                        <span className="error-text">{errors.key}</span>
                    )}
                    <small>Використовуйте точки для вкладених об'єктів</small>
                </div>

                <div className="form-group">
                    <label>Категорія *</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={errors.category ? 'error' : ''}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className="error-text">{errors.category}</span>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Опис</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Короткий опис для чого цей переклад"
                />
            </div>

            <div className="translations-group">
                <h3>Переклади</h3>

                <div className="form-group">
                    <label>🇬🇧 Англійська *</label>
                    <textarea
                        name="en"
                        value={formData.en}
                        onChange={handleInputChange}
                        rows={2}
                        className={errors.en ? 'error' : ''}
                        placeholder="English translation"
                    />
                    {errors.en && (
                        <span className="error-text">{errors.en}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>🇷🇺 Російська *</label>
                    <textarea
                        name="ru"
                        value={formData.ru}
                        onChange={handleInputChange}
                        rows={2}
                        className={errors.ru ? 'error' : ''}
                        placeholder="Русский перевод"
                    />
                    {errors.ru && (
                        <span className="error-text">{errors.ru}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>🇺🇦 Українська *</label>
                    <textarea
                        name="uk"
                        value={formData.uk}
                        onChange={handleInputChange}
                        rows={2}
                        className={errors.uk ? 'error' : ''}
                        placeholder="Український переклад"
                    />
                    {errors.uk && (
                        <span className="error-text">{errors.uk}</span>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} disabled={loading}>
                    Скасувати
                </button>
                <button type="submit" disabled={loading}>
                    {loading
                        ? 'Збереження...'
                        : editingTranslation
                          ? 'Оновити'
                          : 'Додати'}
                </button>
            </div>
        </form>
    );
};

export default TranslationForm;
