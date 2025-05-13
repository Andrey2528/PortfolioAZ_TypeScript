import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/shared/components/Navbar/LanguageSwitcher';
import { navPage } from '@/api/navigation/navPage';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/theme/ThemeToggle';
import '@/styles/index.scss';
import { FC } from 'react';

// Типізація пропсів
interface NavbarProps {
    setTheme: (theme: string) => void;
    theme: string;
}

const Navbar: FC<NavbarProps> = ({ setTheme, theme }) => {
    const { t, ready } = useTranslation();
    if (!ready) return <div>Loading translations...</div>;

    const linksPage = navPage.map((el, i) => (
        <NavLink
            key={el.id}
            className={({ isActive }) =>
                isActive ? 'active_li navbar__nav__link' : 'navbar__nav__link'
            }
            to={el.route}
        >
            {t(`navMenu.link${i + 2}`)}
        </NavLink>
    ));

    return (
        <header className="header">
            <div className="container">
                <div className="navbar__wrapper">
                    <nav className="navbar__nav">
                        <NavLink to={'/'} className="navbar__logos__wrapper">
                            <div className="navbar__logos__logo">
                                <h2 className="main__title">
                                    {t('navMenu.logo')}
                                </h2>
                            </div>
                        </NavLink>
                        <div className="navbar__nav__links">
                            <div className="navbar__nav__links-wrapper">
                                <p className="navbar__nav__link">
                                    {t('navMenu.link1')}
                                </p>
                            </div>
                            <div className="navbar__nav__links-wrapper">
                                {linksPage}
                            </div>
                            <div className="navbar__nav__links-wrapper">
                                <LanguageSwitcher />
                            </div>
                            <div className="navbar__nav__links-wrapper">
                                <ThemeToggle
                                    setThemes={setTheme}
                                    theme={theme}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
