import { useTranslation } from 'react-i18next';
import socialLinks from '@/api/db/socialLinks';
import skillsListDB from '@/api/db/skillsList';
import logo from '@/assets/logo.png';
import { motion } from 'framer-motion';
import { FC } from 'react';

import { ISkill } from '@/utils/interface/interfaceSocial';
import { ISocialLink } from '@/utils/interface/interfaceSocial';

const InfoPage: FC = () => {
    const { t, ready } = useTranslation();
    if (!ready) return <div>Loading translations...</div>;

    const socialLinksDb = socialLinks.map((item: ISocialLink) => (
        <motion.li
            className="info__item"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
        >
            <a
                href={item.link}
                className="info__text"
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.title}
            </a>
        </motion.li>
    ));

    const skillsList = skillsListDB.map((item: ISkill) => (
        <motion.li
            className="info__item"
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
        >
            <p className="info__text info_description">{item.title}</p>
        </motion.li>
    ));

    return (
        <section className="info">
            <div className="container">
                <div className="info__row">
                    <div className="info__column">
                        <h6 className="info__title">
                            {t('InfoPage.aboutTitle')}
                        </h6>
                        <p className="info__subtitle">
                            {t('InfoPage.aboutSubtitle')}
                        </p>
                        <p className="info__description info__text">
                            {t('InfoPage.aboutText')}
                        </p>
                    </div>

                    <div className="info__column">
                        <h6 className="info__title">
                            {t('InfoPage.skills.skillsTitle')}
                        </h6>
                        <ul className="info__list">{skillsList}</ul>
                    </div>

                    <div className="info__column">
                        <h6 className="info__title">
                            {t('InfoPage.experience.experienceTitle')}
                        </h6>
                        <ul className="info__list">
                            <li className="info__item">
                                <p className="info__description info__text">
                                    {t('InfoPage.experience.experienceText1')}
                                </p>
                            </li>
                            <li className="info__item">
                                <p className="info__description info__text">
                                    {t('InfoPage.experience.experienceText2')}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="info__img-container">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
        </section>
    );
};

export default InfoPage;
