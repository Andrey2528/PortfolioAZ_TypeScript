import { themeDB } from '@/shared/constants/navigation/theme';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
    setThemes: (theme: Theme) => void;
    theme: Theme;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ setThemes, theme }) => {
    const { t } = useTranslation();
    
    const themesList = themeDB.map((el) => {
        return (
            <p
                key={el.id}
                className={`navbar__nav__link ${el.value === theme ? 'active_li' : ''}`}
                onClick={() => {
                    setThemes(el.value as Theme);
                }}
                style={{ cursor: 'pointer' }}
            >
                {t(el.titleKey)}
            </p>
        );
    });

    return <>{themesList}</>;
};

export default ThemeToggle;
