import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Menu, { Item as MenuItem, SelectInfo } from 'rc-menu';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Enum для підтримуваних мов
enum Language {
    EN = 'en',
    UK = 'uk',
    RU = 'ru',
}

// Список мов для відображення
const languageOptions: { code: Language; labelKey: string }[] = [
    { code: Language.EN, labelKey: 'navMenu.link5' },
    { code: Language.UK, labelKey: 'navMenu.link6' },
    { code: Language.RU, labelKey: 'navMenu.link7' },
];

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [defaultLang, setDefaultLang] = useState<Language>(() => {
        const savedLang = Cookies.get('language') as Language;
        if (savedLang && Object.values(Language).includes(savedLang)) {
            return savedLang;
        }
        const fallbackLang = (i18n.language as Language) || Language.EN;
        Cookies.set('language', fallbackLang, { expires: 365 });
        return fallbackLang;
    });

    useEffect(() => {
        if (i18n.language !== defaultLang) {
            i18n.changeLanguage(defaultLang);
        }
    }, [defaultLang, i18n]);

    const handleChange = (e: SelectInfo) => {
        const selectedLang = e.key as Language;
        if (selectedLang === defaultLang) return;

        i18n.changeLanguage(selectedLang).then(() => {
            Cookies.set('language', selectedLang, { expires: 365 });
            setDefaultLang(selectedLang);
        });
    };

    const animationProps = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.3 },
    };

    return (
        <motion.ul
            className="language__list"
            key={defaultLang} // Ключ для перезавантаження анімації
            {...animationProps}
        >
            <li className="language__item">
                <Menu onSelect={handleChange} selectedKeys={[defaultLang]}>
                    {languageOptions.map(({ code, labelKey }) => (
                        <MenuItem
                            key={code}
                            className={
                                defaultLang === code
                                    ? 'active_li'
                                    : 'navbar__nav__link'
                            }
                            {...animationProps} // Анімація для кожного пункту
                        >
                            {t(labelKey)}
                        </MenuItem>
                    ))}
                </Menu>
            </li>
        </motion.ul>
    );
};

export default LanguageSwitcher;
