import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ISocialLink } from '../../shared/interface/interfaceData';
import {
    getSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
} from '../../api/connectDB/dataAPI';

const SocialLinksManager: React.FC = () => {
    const { t } = useTranslation();
    const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingSocialLink, setEditingSocialLink] =
        useState<ISocialLink | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<ISocialLink>>({
        title: '',
        link: '',
    });

    useEffect(() => {
        loadSocialLinks();
    }, []);

    const loadSocialLinks = async () => {
        try {
            setLoading(true);
            const data = await getSocialLinks();
            setSocialLinks(data);
        } catch (error) {
            console.error('Error loading social links:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.link) {
            alert('Заповніть всі поля');
            return;
        }

        try {
            setLoading(true);

            if (editingSocialLink) {
                await updateSocialLink(editingSocialLink.id, formData);
            } else {
                await addSocialLink(formData as Omit<ISocialLink, 'id'>);
            }

            await loadSocialLinks();
            resetForm();
        } catch (error) {
            console.error('Error saving social link:', error);
            alert('Помилка збереження соціального посилання');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (socialLink: ISocialLink) => {
        setEditingSocialLink(socialLink);
        setFormData(socialLink);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm('Ви впевнені, що хочете видалити це соціальне посилання?')
        ) {
            return;
        }

        try {
            setLoading(true);
            await deleteSocialLink(id);
            await loadSocialLinks();
        } catch (error) {
            console.error('Error deleting social link:', error);
            alert('Помилка видалення соціального посилання');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            link: '',
        });
        setEditingSocialLink(null);
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="social-links-manager">
            <div className="social-links-header">
                <h2>Управління соціальними посиланнями</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                >
                    Додати посилання
                </button>
            </div>

            {showForm && (
                <div className="social-links-form-overlay">
                    <div className="social-links-form">
                        <h3>
                            {editingSocialLink
                                ? 'Редагувати посилання'
                                : 'Нове посилання'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Назва платформи *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleInputChange}
                                    placeholder="Instagram"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Посилання *</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link || ''}
                                    onChange={handleInputChange}
                                    placeholder="https://instagram.com/username або @username"
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Збереження...' : 'Зберегти'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={resetForm}
                                    disabled={loading}
                                >
                                    Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="social-links-list">
                {loading && <div className="loading">Завантаження...</div>}

                {socialLinks.length === 0 && !loading && (
                    <div className="empty-state">
                        <p>Соціальні посилання не знайдені</p>
                    </div>
                )}

                <div className="social-links-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Платформа</th>
                                <th>Посилання</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socialLinks.map((socialLink) => (
                                <tr key={socialLink.id}>
                                    <td>{socialLink.id}</td>
                                    <td>{socialLink.title}</td>
                                    <td>
                                        <a
                                            href={
                                                socialLink.link.startsWith(
                                                    'http',
                                                )
                                                    ? socialLink.link
                                                    : `#`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link"
                                        >
                                            {socialLink.link}
                                        </a>
                                    </td>
                                    <td className="social-link-actions">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() =>
                                                handleEdit(socialLink)
                                            }
                                            disabled={loading}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                handleDelete(socialLink.id)
                                            }
                                            disabled={loading}
                                        >
                                            Видалити
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SocialLinksManager;
