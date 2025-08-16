export interface IInfoPage {
    aboutTitle: string;
    aboutSubtitle: string;
    aboutText: string;
    logoImage: string;
    location: string;
    stats: {
        experience: string;
        projects: string;
        clients: string;
    };
    experienceData: IExperienceItem[];
    skillCategories: ISkillCategory[];
}

export interface ISkill {
    id: string | number;
    title: string;
    level: string;
    category: string;
    experience: string;
}

export interface ISkillCategory {
    id: string;
    key: string;
    label: string;
    order: number;
}

export interface IExperienceItem {
    id: string;
    company: string;
    period: string;
    position: string;
    description: string;
    technologies: string[];
    projects: number;
}
