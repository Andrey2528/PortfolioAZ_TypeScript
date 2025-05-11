import { useTranslation } from 'react-i18next';
import socialLinks from '@/api/db/socialLinks';
import skillsListDB from '@/api/db/skillsList';
import logo from '@/assets/logo.png';
import { FC } from 'react';

import { ISkill } from '@/utils/interface/interfaceSocial';
import { ISocialLink } from '@/utils/interface/interfaceSocial';

const InfoPage: FC = () => {
    const { t } = useTranslation();

    const socialLinksDb = socialLinks.map((item: ISocialLink) => (
        <li className="info__item" key={item.id}>
            <a
                href={item.link}
                className="info__text"
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.title}
            </a>
        </li>
    ));

    const skillsList = skillsListDB.map((item: ISkill) => (
        <li className="info__item" key={item.id}>
            <p className="info__text info_description">{item.title}</p>
        </li>
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
