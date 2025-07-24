import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ICertificate } from '../../shared/interface/interfaceData';
import {
    getCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
} from '../../api/connectDB/dataAPI';
import GitHubImageUploader from './GitHubImageUploader';
import FieldPreview from './FieldPreview';

const CertificatesManager: React.FC = () => {
    const { t } = useTranslation();
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingCertificate, setEditingCertificate] =
        useState<ICertificate | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<ICertificate>>({
        title: '',
        date: '',
        img: '',
    });

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            setLoading(true);
            const data = await getCertificates();
            setCertificates(data);
        } catch (error) {
            console.error('Error loading certificates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.date || !formData.img) {
            alert('Заповніть всі поля');
            return;
        }

        try {
            setLoading(true);

            if (editingCertificate) {
                await updateCertificate(editingCertificate.id, formData);
            } else {
                await addCertificate(formData as Omit<ICertificate, 'id'>);
            }

            await loadCertificates();
            resetForm();
        } catch (error) {
            console.error('Error saving certificate:', error);
            alert('Помилка збереження сертифіката');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (certificate: ICertificate) => {
        setEditingCertificate(certificate);
        setFormData(certificate);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Ви впевнені, що хочете видалити цей сертифікат?')) {
            return;
        }

        try {
            setLoading(true);
            await deleteCertificate(id);
            await loadCertificates();
        } catch (error) {
            console.error('Error deleting certificate:', error);
            alert('Помилка видалення сертифіката');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            img: '',
        });
        setEditingCertificate(null);
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (imageUrl: string) => {
        setFormData((prev) => ({
            ...prev,
            img: imageUrl,
        }));
    };

    return (
        <div className="certificates-manager">
            <div className="certificates-header">
                <h2>Управління сертифікатами</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                >
                    Додати сертифікат
                </button>
            </div>

            {showForm && (
                <div className="certificates-form-overlay">
                    <div className="certificates-form">
                        <h3>
                            {editingCertificate
                                ? 'Редагувати сертифікат'
                                : 'Новий сертифікат'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Назва сертифіката *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title || ''}
                                    onChange={handleInputChange}
                                    placeholder="certificate.title1"
                                    required
                                />
                                <FieldPreview
                                    value={formData.title || ''}
                                    fieldName="Назва"
                                    isTranslationKey={true}
                                />
                            </div>

                            <div className="form-group">
                                <label>Дата отримання *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Зображення сертифіката *</label>
                                <GitHubImageUploader
                                    currentImage={formData.img}
                                    onImageUpload={handleImageUpload}
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

            <div className="certificates-list">
                {loading && <div className="loading">Завантаження...</div>}

                {certificates.length === 0 && !loading && (
                    <div className="empty-state">
                        <p>Сертифікати не знайдені</p>
                    </div>
                )}

                <div className="certificates-grid">
                    {certificates.map((certificate) => (
                        <div key={certificate.id} className="certificate-card">
                            <div className="certificate-image">
                                <img
                                    src={certificate.img}
                                    alt={certificate.title}
                                />
                            </div>
                            <div className="certificate-info">
                                <h4>{certificate.title}</h4>
                                <p className="certificate-date">
                                    {certificate.date}
                                </p>
                                <div className="certificate-actions">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleEdit(certificate)}
                                        disabled={loading}
                                    >
                                        Редагувати
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                            handleDelete(certificate.id)
                                        }
                                        disabled={loading}
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CertificatesManager;
