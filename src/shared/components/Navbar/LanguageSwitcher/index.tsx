import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Menu, { Item as MenuItem, SelectInfo } from 'rc-menu';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

enum Language {
    EN = 'en',
    UK = 'uk',
    RU = 'ru',
}

const languageOptions: { code: Language; labelKey: string }[] = [
    { code: Language.EN, labelKey: 'navMenu.link5' },
    { code: Language.UK, labelKey: 'navMenu.link6' },
    { code: Language.RU, labelKey: 'navMenu.link7' },
];

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [defaultLang, setDefaultLang] = useState<Language>(() => {
        const savedLang = Cookies.get('language') as Language;
        return Object.values(Language).includes(savedLang)
            ? savedLang
            : (i18n.language as Language) || Language.EN;
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

            ReactGA.event({
                category: 'LanguageSwitcher',
                action: `${selectedLang} version is chosen`,
            });
        });
    };

    return (
        <ul className="language__list">
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
                        >
                            {t(labelKey)}
                        </MenuItem>
                    ))}
                </Menu>
            </li>
        </ul>
    );
};

export default LanguageSwitcher;
