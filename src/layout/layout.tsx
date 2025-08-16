import { Footer, Navbar } from '@/shared/components';
import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import '@/shared/styles/index.scss';
import { ThemeContext } from '@/theme/ThemeContext';

const Layout = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        console.error('ThemeContext is not provided');
        return null;
    }

    const { theme, toggleTheme } = themeContext;

    const location = useLocation();

    return (
        <main className={`Layout ${theme}-theme`}>
            <Navbar setTheme={toggleTheme} />

            <section className="Layout__section">
                <Outlet />
            </section>
            <Footer theme={theme} />
        </main>
    );
};

export default Layout;
