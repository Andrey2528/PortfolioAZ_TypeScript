import { createContext, useState, useEffect, ReactNode } from 'react';
import '@/shared/styles/index.scss';

interface IThemeProviderProps {
    children: ReactNode;
}

type Theme = 'light' | 'dark';

interface IThemeContextType {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

// Створюємо контекст з початковим значенням null
export const ThemeContext = createContext<IThemeContextType | null>(null);

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    const [theme, setTheme] = useState<Theme>(savedTheme);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
