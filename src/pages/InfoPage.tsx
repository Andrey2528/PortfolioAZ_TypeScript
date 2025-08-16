import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import { getSkills } from '@/api/connectDB/dataAPI';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import {
    IInfoPage,
    ISkill,
    ISkillCategory,
    IExperienceItem,
} from '@/shared/interface/InfoPage.interface';
import Loader from '@/shared/components/Loader/Loader';

import logo from '@/assets/logo.png';

const InfoPage: FC = () => {
    const { t } = useTranslation();
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<ISkillCategory[]>([
        { id: '1', key: 'all', label: 'Всі', order: 1 },
        { id: '2', key: 'frontend', label: 'Frontend', order: 2 },
        { id: '3', key: 'backend', label: 'Backend', order: 3 },
        { id: '4', key: 'tools', label: 'Інструменти', order: 4 },
        { id: '5', key: 'other', label: 'Інше', order: 5 },
    ]);
    const [settings, setSettings] = useState<IInfoPage>({
        aboutTitle: t('InfoPage.aboutTitle'),
        aboutSubtitle: t('InfoPage.aboutSubtitle'),
        aboutText: t('InfoPage.aboutText'),
        logoImage: '',
        location: 'Івано-Франківськ, Україна',
        stats: {
            experience: '5+',
            projects: '40+',
            clients: '20+',
        },
        experienceData: [], // Буде завантажено з Firebase
        skillCategories: [], // Буде завантажено з Firebase
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                // Завантаження налаштувань з Firebase
                const settingsDoc = await getDoc(
                    doc(db, 'settings', 'infopage'),
                );
                if (settingsDoc.exists()) {
                    const firebaseSettings = settingsDoc.data() as IInfoPage;
                    setSettings((prev) => ({
                        ...prev,
                        ...firebaseSettings,
                    }));

                    // Завантажуємо категорії навичок якщо вони є
                    if (
                        firebaseSettings.skillCategories &&
                        firebaseSettings.skillCategories.length > 0
                    ) {
                        const sortedCategories =
                            firebaseSettings.skillCategories.sort(
                                (a, b) => a.order - b.order,
                            );
                        setCategories(sortedCategories);
                    }
                }

                // Завантаження навичок
                const skillsData = await getSkills();

                // Фільтруємо навички, виключаючи ті, що містять тестові тексти
                const filteredSkills = skillsData.filter(
                    (skill) =>
                        skill.title &&
                        !skill.title.includes('InfoPage.skills.skillsText') &&
                        !skill.title.includes('skillsText') &&
                        skill.title.trim().length > 0,
                );

                const mappedSkills: ISkill[] = filteredSkills.map(
                    (skill: any, index) => ({
                        id: skill.id || index.toString(),
                        title: skill.title,
                        level: skill.level
                            ? skill.level.toString()
                            : (Math.floor(Math.random() * 5) + 1).toString(),
                        category:
                            skill.category || getCategoryByTitle(skill.title),
                        experience:
                            skill.experience ||
                            getExperienceByTitle(skill.title),
                    }),
                );
                setSkills(mappedSkills);
            } catch (error) {
                console.error('Error loading InfoPage data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [t]);

    const getCategoryByTitle = (title: string): string => {
        const frontendSkills = [
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Vue',
            'Angular',
            'TypeScript',
            'SCSS',
            'Tailwind',
        ];
        const backendSkills = [
            'Node.js',
            'PHP',
            'Python',
            'Express',
            'MongoDB',
            'MySQL',
            'PostgreSQL',
        ];
        const toolsSkills = [
            'Git',
            'Docker',
            'Webpack',
            'Vite',
            'Figma',
            'Photoshop',
        ];

        if (
            frontendSkills.some((skill) =>
                title.toLowerCase().includes(skill.toLowerCase()),
            )
        ) {
            return 'frontend';
        }
        if (
            backendSkills.some((skill) =>
                title.toLowerCase().includes(skill.toLowerCase()),
            )
        ) {
            return 'backend';
        }
        if (
            toolsSkills.some((skill) =>
                title.toLowerCase().includes(skill.toLowerCase()),
            )
        ) {
            return 'tools';
        }
        return 'other';
    };

    const getExperienceByTitle = (title: string): string => {
        const experiences = [
            '2+ роки',
            '3+ роки',
            '1+ рік',
            '4+ роки',
            '5+ років',
        ];
        return experiences[Math.floor(Math.random() * experiences.length)];
    };

    const filteredSkills =
        selectedCategory === 'all'
            ? skills
            : skills.filter((skill) => skill.category === selectedCategory);

    const renderProgressBar = (level: string | number) => {
        const numericLevel =
            typeof level === 'string' ? parseInt(level) : level;
        const percentage = (numericLevel / 5) * 100;

        // Визначаємо колір залежно від рівня
        const getProgressColor = (level: number) => {
            if (level <= 2)
                return 'linear-gradient(90deg, #ef4444 0%, #f97316 100%)'; // Червоний-помаранчевий
            if (level <= 3)
                return 'linear-gradient(90deg, #f59e0b 0%, #eab308 100%)'; // Помаранчевий-жовтий
            if (level <= 4)
                return 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'; // Зелений
            return 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)'; // Синій-фіолетовий-блакитний
        };

        return (
            <div className="progress-bar-container">
                <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    style={{ background: getProgressColor(numericLevel) }}
                ></motion.div>
                <span className="progress-text">{percentage}%</span>
            </div>
        );
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <section className="info-modern">
                    <div className="container">
                        {/* About Section */}
                        <motion.div
                            className="info-section about-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="section-header">
                                <h2 className="section-title">
                                    <span className="title-icon">👨‍💻</span>
                                    {settings.aboutTitle}
                                </h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="about-content">
                                <div className="about-text">
                                    <h3 className="about-subtitle">
                                        {settings.aboutSubtitle}
                                    </h3>
                                    <p className="about-description">
                                        {settings.aboutText}
                                    </p>

                                    <div className="stats-cards">
                                        <div className="stat-card">
                                            <div className="stat-number">
                                                {settings.stats.experience}
                                            </div>
                                            <div className="stat-label">
                                                Років досвіду
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-number">
                                                {settings.stats.projects}
                                            </div>
                                            <div className="stat-label">
                                                Завершених проектів
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-number">
                                                {settings.stats.clients}
                                            </div>
                                            <div className="stat-label">
                                                Задоволених клієнтів
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-image">
                                    <div className="image-container">
                                        <img
                                            src={settings.logoImage || logo}
                                            alt="Andrii Zhukov"
                                        />
                                        <div className="image-overlay">
                                            <div className="location-badge">
                                                <span className="location-icon">
                                                    📍
                                                </span>
                                                {settings.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Experience Section */}
                        <motion.div
                            className="info-section experience-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="section-header">
                                <h2 className="section-title">
                                    <span className="title-icon">💼</span>
                                    {t('InfoPage.experience.experienceTitle')}
                                </h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="experience-timeline">
                                {settings.experienceData.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        className="timeline-item"
                                        initial={{
                                            opacity: 0,
                                            x: index % 2 === 0 ? -50 : 50,
                                        }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.2,
                                        }}
                                    >
                                        <div className="timeline-marker">
                                            <div className="marker-dot"></div>
                                            <div className="marker-line"></div>
                                        </div>

                                        <div className="timeline-content">
                                            <div className="timeline-header">
                                                <h3 className="company-name">
                                                    {exp.company}
                                                </h3>
                                                <span className="period-badge">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <h4 className="position-title">
                                                {exp.position}
                                            </h4>
                                            <p className="description">
                                                {exp.description}
                                            </p>

                                            <div className="experience-details">
                                                <div className="projects-count">
                                                    <span className="projects-icon">
                                                        📊
                                                    </span>
                                                    <span>
                                                        {exp.projects}+ проектів
                                                    </span>
                                                </div>

                                                <div className="technologies">
                                                    <span className="tech-label">
                                                        Технології:
                                                    </span>
                                                    <div className="tech-tags">
                                                        {exp.technologies.map(
                                                            (tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="tech-tag"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Skills Section */}
                        <motion.div
                            className="info-section skills-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="section-header">
                                <h2 className="section-title">
                                    <span className="title-icon">🛠️</span>
                                    {t('InfoPage.skills.skillsTitle')}
                                </h2>
                                <div className="title-underline"></div>
                            </div>

                            <div className="skills-filters">
                                {categories.map((category) => (
                                    <button
                                        key={category.key}
                                        className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
                                        onClick={() =>
                                            setSelectedCategory(category.key)
                                        }
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>

                            <div className="skills-table-container">
                                <div className="skills-table">
                                    <div className="table-header">
                                        <div className="header-cell skill-name">
                                            Навичка
                                        </div>
                                        <div className="header-cell skill-level">
                                            Рівень
                                        </div>
                                        <div className="header-cell skill-experience">
                                            Досвід
                                        </div>
                                        <div className="header-cell skill-category">
                                            Категорія
                                        </div>
                                    </div>

                                    <div className="table-body">
                                        {filteredSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.id}
                                                className="table-row"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.1,
                                                }}
                                            >
                                                <div className="table-cell skill-name">
                                                    <div className="skill-title">
                                                        {skill.title}
                                                    </div>
                                                </div>
                                                <div className="table-cell skill-level">
                                                    <div className="progress-container">
                                                        {renderProgressBar(
                                                            skill.level,
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="table-cell skill-experience">
                                                    {skill.experience}
                                                </div>
                                                <div className="table-cell skill-category">
                                                    <span
                                                        className={`category-badge ${skill.category}`}
                                                    >
                                                        {categories.find(
                                                            (cat) =>
                                                                cat.key ===
                                                                skill.category,
                                                        )?.label ||
                                                            skill.category}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </>
    );
};

export default InfoPage;
