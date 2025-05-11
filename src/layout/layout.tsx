import { Footer, Navbar } from '@/shared/components';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '@/styles/index.scss';
import { ThemeContext } from '@/ThemeContext';
import Loader from '@/components/Loader/Loader';

const Layout = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        console.error('ThemeContext is not provided');
        return null;
    }

    const { theme, toggleTheme } = themeContext;

    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Затримка для лоадера (можна налаштувати)

        return () => clearTimeout(timer); // Очищаємо таймер при переході
    }, [location]);

    return (
        <main className={`Layout ${theme}-theme`}>
            <Navbar setTheme={toggleTheme} />
            {isLoading && <Loader />} {/* Покажемо лоадер під час переходу */}
            <section className="Layout__section">
                <Outlet />
            </section>
            <Footer theme={theme} />
        </main>
    );
};

export default Layout;
