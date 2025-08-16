import { useContext } from 'react';
import { ThemeContext } from '@/theme/ThemeContext'; // заміни шлях, якщо потрібно
import '@/shared/styles/index.scss';
import imgDark from '@/assets/logo_spiner_dark.jpg';
import imgLight from '@/assets/logo_spiner_light.jpg';

const Loader = () => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme || 'light';

    const imageSrc = theme === 'dark' ? imgDark : imgLight;

    return (
        <div className={`loader ${theme}`}>
            <img src={imageSrc} alt="Loading..." className="loader__image" />
        </div>
    );
};

export default Loader;
