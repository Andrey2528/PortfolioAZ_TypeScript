import React, { useState, useEffect } from 'react';
import { ITranslation } from '../../shared/interface/interfaceTranslation';
import {
    fetchTranslations,
    deleteTranslation,
    exportTranslationsToJSON,
} from '../../api/connectDB/translationsAPI';
import { importTranslationsToFirebase } from '../../api/connectDB/translationImporter';
import { reloadTranslations } from '../../utils/i18nWithFirebase';
import TranslationForm from './TranslationForm';

const TranslationsManager: React.FC = () => {
    const [translations, setTranslations] = useState<ITranslation[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
    const [editingTranslation, setEditingTranslation] =
        useState<ITranslation | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        loadTranslations();
    }, []);

    const loadTranslations = async () => {
        setLoading(true);
        try {
            const data = await fetchTranslations();
            setTranslations(data);
        } catch (error) {
            console.error('Error loading translations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSuccess = async () => {
        await loadTranslations();
        await reloadTranslations(); // Оновлюємо переклади в i18n
        setActiveTab('list');
    };

    const handleEditSuccess = async () => {
        await loadTranslations();
        await reloadTranslations(); // Оновлюємо переклади в i18n
        setActiveTab('list');
        setEditingTranslation(null);
    };

    const handleEdit = (translation: ITranslation) => {
        setEditingTranslation(translation);
        setActiveTab('edit');
    };

    const handleDelete = async (translation: ITranslation) => {
        if (!window.confirm(`Видалити переклад "${translation.key}"?`)) {
            return;
        }

        setDeletingId(translation.id);
        try {
            await deleteTranslation(translation.id);
            await loadTranslations();
            await reloadTranslations(); // Оновлюємо переклади в i18n
        } catch (error) {
            console.error('Error deleting translation:', error);
            alert('Помилка при видаленні');
        } finally {
            setDeletingId(null);
        }
    };

    const handleExport = async () => {
        try {
            const exportedData = await exportTranslationsToJSON();
            const dataStr = JSON.stringify(exportedData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'translations.json';
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting translations:', error);
            alert('Помилка при експорті');
        }
    };

    const handleImport = async () => {
        if (
            !window.confirm(
                'Це імпортує всі переклади з JSON файлів до Firebase. Продовжити?',
            )
        ) {
            return;
        }

        setImporting(true);
        try {
            const result = await importTranslationsToFirebase();

            if (result.errors.length > 0) {
                console.warn('Import completed with errors:', result.errors);
                alert(
                    `Імпортовано ${result.success} перекладів з ${result.errors.length} помилками. Перевірте консоль для деталей.`,
                );
            } else {
                alert(`Успішно імпортовано ${result.success} перекладів!`);
            }

            // Перезавантажуємо переклади
            await loadTranslations();
            await reloadTranslations();
        } catch (error) {
            console.error('Error importing translations:', error);
            alert('Помилка при імпорті перекладів');
        } finally {
            setImporting(false);
        }
    };

    // Фільтрація перекладів
    const filteredTranslations = translations.filter((translation) => {
        const matchesSearch =
            translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            translation.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            translation.ru.toLowerCase().includes(searchTerm.toLowerCase()) ||
            translation.uk.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === '' ||
            translation.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Унікальні категорії
    const categories = Array.from(
        new Set(translations.map((t) => t.category)),
    ).sort();

    if (loading) {
        return (
            <div className="translations-manager loading">Завантаження...</div>
        );
    }

    return (
        <div className="translations-manager">
            <header className="translations-header">
                <h1>Управління перекладами</h1>
                <div className="translations-nav">
                    <button
                        className={activeTab === 'list' ? 'active' : ''}
                        onClick={() => setActiveTab('list')}
                    >
                        Список ({translations.length})
                    </button>
                    <button
                        className={activeTab === 'add' ? 'active' : ''}
                        onClick={() => setActiveTab('add')}
                    >
                        Додати переклад
                    </button>
                    <button
                        onClick={handleImport}
                        className="import-btn"
                        disabled={importing}
                    >
                        {importing ? '⏳ Імпорт...' : '📤 Імпорт з JSON'}
                    </button>
                    <button onClick={handleExport} className="export-btn">
                        📥 Експорт JSON
                    </button>
                </div>
            </header>

            <main className="translations-content">
                {activeTab === 'list' && (
                    <div className="translations-list">
                        <div className="list-controls">
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Пошук по ключу або тексту..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>

                            <div className="category-filter">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                >
                                    <option value="">Всі категорії</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <table className="translations-table">
                            <thead>
                                <tr>
                                    <th>Ключ</th>
                                    <th>Категорія</th>
                                    <th>EN</th>
                                    <th>RU</th>
                                    <th>UK</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTranslations.map((translation) => (
                                    <tr key={translation.id}>
                                        <td className="key-cell">
                                            <code>{translation.key}</code>
                                            {translation.description && (
                                                <small>
                                                    {translation.description}
                                                </small>
                                            )}
                                        </td>
                                        <td className="category-cell">
                                            <span className="category-badge">
                                                {translation.category}
                                            </span>
                                        </td>
                                        <td className="translation-cell">
                                            {translation.en}
                                        </td>
                                        <td className="translation-cell">
                                            {translation.ru}
                                        </td>
                                        <td className="translation-cell">
                                            {translation.uk}
                                        </td>
                                        <td className="actions-cell">
                                            <div className="btn-group">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(translation)
                                                    }
                                                >
                                                    Редагувати
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            translation,
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        translation.id
                                                    }
                                                >
                                                    {deletingId ===
                                                    translation.id
                                                        ? 'Видалення...'
                                                        : 'Видалити'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredTranslations.length === 0 && (
                            <div className="no-results">
                                {searchTerm || selectedCategory
                                    ? 'Нічого не знайдено'
                                    : 'Немає перекладів'}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'add' && (
                    <TranslationForm
                        onSuccess={handleAddSuccess}
                        onCancel={() => setActiveTab('list')}
                    />
                )}

                {activeTab === 'edit' && editingTranslation && (
                    <TranslationForm
                        editingTranslation={editingTranslation}
                        onSuccess={handleEditSuccess}
                        onCancel={() => {
                            setActiveTab('list');
                            setEditingTranslation(null);
                        }}
                    />
                )}
            </main>
        </div>
    );
};

export default TranslationsManager;
