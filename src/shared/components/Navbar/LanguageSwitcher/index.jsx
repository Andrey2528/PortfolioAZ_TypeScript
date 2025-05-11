import i18n from 'i18next'; // Додайте цей імпорт, якщо не імпортується
import Cookies from 'js-cookie';
import Menu, { Item as MenuItem } from 'rc-menu';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import '@/styles/index.scss';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const [defaultLang, setDefaultLang] = useState(() => {
        const savedLang = Cookies.get('language') || 'en';
        return savedLang;
    });

    useEffect(() => {
        console.log(Cookies.get('language')); // Це має працювати в компоненті
    }, []);

    const handleChange = (e) => {
        const lang = e.key;
        Cookies.set('language', lang, { expires: 365 });

        ReactGA.event({
            category: 'LanguageSwitcher',
            action: `${lang} version is chosen`,
        });

        i18n.changeLanguage(lang); // 🔥 без перезавантаження
        setDefaultLang(lang); // оновлюємо локальний стейт
    };

    const menu = (
        <Menu onSelect={handleChange}>
            <MenuItem
                key="en"
                className={
                    defaultLang === 'en' ? 'active_li' : 'navbar__nav__link'
                }
            >
                {t('navMenu.link5')}
            </MenuItem>
            <MenuItem
                key="uk"
                className={
                    defaultLang === 'uk' ? 'active_li' : 'navbar__nav__link'
                }
            >
                {t('navMenu.link6')}
            </MenuItem>
            <MenuItem
                key="ru"
                className={
                    defaultLang === 'ru' ? 'active_li' : 'navbar__nav__link'
                }
            >
                {t('navMenu.link7')}
            </MenuItem>
        </Menu>
    );

    return (
        <ul className="language__list">
            <li className="language__item">{menu}</li>
        </ul>
    );
};

export default LanguageSwitcher;
