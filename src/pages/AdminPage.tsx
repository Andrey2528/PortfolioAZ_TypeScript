import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { isAdmin } from '../utils/adminUtils';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminDashboard from '../components/Admin/AdminDashboard';
import '../shared/styles/components/Admin/AdminPage.scss';

const AdminPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleLoginSuccess = () => {
        // Пользователь будет установлен автоматически через onAuthStateChanged
    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '18px',
                    color: '#666',
                }}
            >
                Загрузка...
            </div>
        );
    }

    if (!user) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    // Проверка прав администратора
    if (!isAdmin(user)) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>
                    Доступ запрещен
                </h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    У вас нет прав доступа к административной панели.
                </p>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        background: '#007acc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Выйти
                </button>
            </div>
        );
    }

    return (
        <div className="admin-page-wrapper">
            <div className="admin-welcome-header">
                <div className="welcome-content">
                    <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <div className="user-details">
                            <span className="welcome-text">
                                Добро пожаловать!
                            </span>
                            <span className="user-email">{user.email}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                        title="Выйти из системы"
                    >
                        <span className="logout-icon">🚪</span>
                        Выйти
                    </button>
                </div>
            </div>
            <AdminDashboard />
        </div>
    );
};

export default AdminPage;
