import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FC } from 'react';

import logo from '@/assets/logo.png';
import SkillsListRender from '@/components/InfoPage/SkillsListRender';
import { animationSertificateProps } from '@/shared/config/animationConfig';

const InfoPage: FC = () => {
    const { t } = useTranslation();

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
                        <ul className="info__list">
                            <SkillsListRender />
                        </ul>
                    </div>

                    <div className="info__column">
                        <h6 className="info__title">
                            {t('InfoPage.experience.experienceTitle')}
                        </h6>
                        <ul className="info__list">
                            <motion.li
                                className="info__item"
                                {...animationSertificateProps}
                            >
                                <p className="info__description info__text">
                                    {t('InfoPage.experience.experienceText1')}
                                </p>
                            </motion.li>
                            <motion.li
                                className="info__item"
                                {...animationSertificateProps}
                            >
                                <p className="info__description info__text">
                                    {t('InfoPage.experience.experienceText2')}
                                </p>
                            </motion.li>
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
