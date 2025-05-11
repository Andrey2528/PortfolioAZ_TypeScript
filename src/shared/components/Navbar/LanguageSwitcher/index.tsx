import i18n from 'i18next';
import Cookies from 'js-cookie';
import Menu, { Item as MenuItem, SelectInfo } from 'rc-menu';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import '@/styles/index.scss';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const [defaultLang, setDefaultLang] = useState<string>(() => {
        return Cookies.get('language') || 'en';
    });

    useEffect(() => {
        console.log(Cookies.get('language'));
    }, []);

    const handleChange = (e: SelectInfo) => {
        const lang = e.key;
        Cookies.set('language', lang, { expires: 365 });

        ReactGA.event({
            category: 'LanguageSwitcher',
            action: `${lang} version is chosen`,
        });

        i18n.changeLanguage(lang);
        setDefaultLang(lang);
    };

    return (
        <ul className="language__list">
            <li className="language__item">
                <Menu onSelect={handleChange}>
                    <MenuItem
                        key="en"
                        className={
                            defaultLang === 'en'
                                ? 'active_li'
                                : 'navbar__nav__link'
                        }
                    >
                        {t('navMenu.link5')}
                    </MenuItem>
                    <MenuItem
                        key="uk"
                        className={
                            defaultLang === 'uk'
                                ? 'active_li'
                                : 'navbar__nav__link'
                        }
                    >
                        {t('navMenu.link6')}
                    </MenuItem>
                    <MenuItem
                        key="ru"
                        className={
                            defaultLang === 'ru'
                                ? 'active_li'
                                : 'navbar__nav__link'
                        }
                    >
                        {t('navMenu.link7')}
                    </MenuItem>
                </Menu>
            </li>
        </ul>
    );
};

export default LanguageSwitcher;
