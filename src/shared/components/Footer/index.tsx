import { useTranslation } from 'react-i18next';
import '@/shared/styles/index.scss';
import socialImg from '@/shared/constants/socialImg.const';
import socialLinks from '@/shared/constants/socialLinks.const';

const Footer = ({ theme }) => {
    const { t } = useTranslation();

    // Фільтрація зображень в залежності від теми
    const filteredImages =
        theme === 'dark' ? socialImg.slice(0, 4) : socialImg.slice(4, 9);

    // Створюємо мапу посилань по title для швидкого доступу
    const socialLinksMap = socialLinks.reduce((acc, item) => {
        acc[item.title] = item.link;
        return acc;
    }, {});

    // Формуємо список зображень з відповідними посиланнями
    const socialImgDb = filteredImages.map((item) => {
        const link = socialLinksMap[item.title] || '#';

        return (
            <li key={item.title} className="footer__item">
                <div className="footer__img-wrapper">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="effect"
                    >
                        <img src={item.img} alt={item.title || ''} />
                    </a>
                </div>
            </li>
        );
    });

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__text">{t('navMenu.logo')}</div>
                    <a
                        href="mailto:Zhukovandrey02@gmail.com"
                        className="footer__mail footer__text effect"
                    >
                        Zhukovandrey02@gmail.com
                    </a>
                    <ul className="footer__list">{socialImgDb}</ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
