import i18next from '../../utils/i18nWithFirebase';

// Простий інтерфейс для списку навичок
interface ISkillItem {
    id: number;
    title: string;
}

export const skillsListDB: ISkillItem[] = [
    {
        id: 5,
        title: i18next.t('InfoPage.skills.skillsText5'),
    },
    {
        id: 4,
        title: i18next.t('InfoPage.skills.skillsText4'),
    },
    {
        id: 3,
        title: i18next.t('InfoPage.skills.skillsText3'),
    },
    {
        id: 2,
        title: i18next.t('InfoPage.skills.skillsText2'),
    },
    {
        id: 1,
        title: i18next.t('InfoPage.skills.skillsText1'),
    },
];

export default skillsListDB;
