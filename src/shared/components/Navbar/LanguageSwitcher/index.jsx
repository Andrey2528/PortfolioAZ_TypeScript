import Cookies from 'js-cookie';
import Menu, { Item as MenuItem } from 'rc-menu';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import '@/styles/index.scss';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const [defaultLang, setDefaultLang] = useState('en');

    const handleChange = (e) => {
        const lang = e.key;
        Cookies.set('language', lang, { expires: 365 });

        ReactGA.event({
            category: 'LanguageSwitcher',
            action: `${lang} version is chosen`,
        });

        window.location.reload(false);
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

    useEffect(() => {
        const savedLang = localStorage.getItem('i18nextLng');
        const supportedLangs = ['en', 'uk', 'ru'];

        if (!supportedLangs.includes(savedLang)) {
            setDefaultLang('');
        } else {
            setDefaultLang(savedLang);
        }
    }, [defaultLang]);

    return (
        <ul className="language__list">
            <li className="language__item">{menu}</li>
        </ul>
    );
};

export default LanguageSwitcher;
