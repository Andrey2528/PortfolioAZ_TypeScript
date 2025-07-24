import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ISkill } from '../../shared/interface/interfaceData';
import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
} from '../../api/connectDB/dataAPI';
import FieldPreview from './FieldPreview';

const SkillsManager: React.FC = () => {
    const { t } = useTranslation();
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<ISkill>>({
        title: '',
    });

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            setLoading(true);
            const data = await getSkills();
            setSkills(data);
        } catch (error) {
            console.error('Error loading skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            alert('Заповніть назву навички');
            return;
        }

        try {
            setLoading(true);

            if (editingSkill) {
                await updateSkill(editingSkill.id, formData);
            } else {
                await addSkill(formData as Omit<ISkill, 'id'>);
            }

            await loadSkills();
            resetForm();
        } catch (error) {
            console.error('Error saving skill:', error);
            alert('Помилка збереження навички');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (skill: ISkill) => {
        setEditingSkill(skill);
        setFormData(skill);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Ви впевнені, що хочете видалити цю навичку?')) {
            return;
        }

        try {
            setLoading(true);
            await deleteSkill(id);
            await loadSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
            alert('Помилка видалення навички');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
        });
        setEditingSkill(null);
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
        <div className="skills-manager">
            <div className="skills-header">
                <h2>Управління навичками</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                >
                    Додати навичку
                </button>
            </div>

            {showForm && (
                <div className="skills-form-overlay">
                    <div className="skills-form">
                        <h3>
                            {editingSkill
                                ? 'Редагувати навичку'
                                : 'Нова навичка'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Назва навички *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleInputChange}
                                    placeholder="InfoPage.skills.skillsText1"
                                    required
                                />
                                <FieldPreview
                                    value={formData.title || ''}
                                    fieldName="Назва"
                                    isTranslationKey={true}
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

            <div className="skills-list">
                {loading && <div className="loading">Завантаження...</div>}

                {skills.length === 0 && !loading && (
                    <div className="empty-state">
                        <p>Навички не знайдені</p>
                    </div>
                )}

                <div className="skills-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Назва</th>
                                <th>Переклад</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill) => (
                                <tr key={skill.id}>
                                    <td>{skill.id}</td>
                                    <td>
                                        <code>{skill.title}</code>
                                    </td>
                                    <td>{t(skill.title)}</td>
                                    <td className="skill-actions">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(skill)}
                                            disabled={loading}
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                handleDelete(skill.id)
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

export default SkillsManager;
