import i18next from '../../utils/i18n';
import { ISkill } from '@/utils/interface/interfaceSocial';
export const skillsListDB: ISkill[] = [
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
