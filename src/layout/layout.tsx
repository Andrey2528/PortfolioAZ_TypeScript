import { Footer, Navbar } from '@/shared/components';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '@/styles/index.scss';
import { ThemeContext } from '@/ThemeContext';

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
