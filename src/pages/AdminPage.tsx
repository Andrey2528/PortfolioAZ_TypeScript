import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { isAdmin } from '../utils/adminUtils';
import AdminLogin from '../components/Admin/AdminLogin';
import AdminDashboard from '../components/Admin/AdminDashboard';

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
        <div>
            <div
                style={{
                    background: '#f8f9fa',
                    padding: '10px 20px',
                    borderBottom: '1px solid #dee2e6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span style={{ color: '#666', fontSize: '14px' }}>
                    Добро пожаловать, {user.email}
                </span>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '6px 12px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    Выйти
                </button>
            </div>
            <AdminDashboard />
        </div>
    );
};

export default AdminPage;
