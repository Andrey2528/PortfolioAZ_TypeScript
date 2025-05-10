import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        lng: Cookies.get('language') || 'en',
        fallbackLng: ['en', 'uk', 'ru'],
        detection: { order: ['cookie'], cache: ['cookie'] },
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    filter: {
                        "role": "Role:",
                        "year": "Year:",
                        "time": "Time:",
                        "all": "All",
                        "timeLessThan10": "Less than 10 hours",
                        "timeLessThan20": "Less than 20 hours",
                        "timeLessThan50": "Less than 50 hours",
                        "timeLessThan100": "Less than 100 hours",
                        "reset": "Reset Filters"
                    },
                    navMenu: {
                        logo: 'Andrey Zhukov',
                        link1: 'Front-end\n' + 'Developer',
                        link2: 'About me',
                        link3: 'Portfolio',
                        link4: 'Sertificates',
                        link5: 'English',
                        link6: 'Українська',
                        link7: 'руский',
                    },
                    theme: {
                        dark: 'Dark mode',
                        light: 'Light mode',
                    },
                    portfolioCard: {
                        title: {
                            title1: 'Denis Portfolio',
                            title2: 'Konstruct',
                            title3: 'Fair Partner',
                            title4: 'People Tobacco',
                            title5: 'Meat Hammer Site',
                            title6: 'Manipura',
                            title7: 'Batumi Racing Club',
                            title8: 'Sketch2Site Development',
                            title9: 'Sers',
                            title10: 'Biko Butik',
                            title11: 'Andriy Zhukov',
                            title12: 'Shashlychny calculator',
                        },
                        description: {
                            description1:
                                'Denis Portfolio - A basic website that is a standard part of any portfolio.',
                            description2:
                                'Konstruct - A basic website that is a standard part of any portfolio.',
                            description3:
                                'Fair Partner - A website for the Polish company Fair Partner. A joint project with Meat Hammer Studio.',
                            description4:
                                'People Tobacco - A website for a company that produces hookah tobacco.',
                            description5:
                                'Meat Hammer Site - A company where I worked since 2020. This is its corporate website.',
                            description6:
                                'Manipura - A business card website for a yoga center.',
                            description7:
                                'Batumi Racing Club - A website built for a Georgian karting track, the largest karting track in Europe.',
                            description8:
                                'Sketch2Site Development - A website created for an international web development company.',
                            description9:
                                'Sers - A website developed on request for a Spanish web development company. Development time - 50 hours.',
                            description10:
                                'Biko Butik - business card website for online shop.',
                            description11:
                                'Andriy Zhukov - site portfolio for me.',
                            description12:
                                'Shashlychny calculator - a site for calculating the amount of meat for the holiday.',
                        },
                        subTitle: 'Web-site',
                        role1: 'Developer',
                        role2: 'Designer',
                        role3: 'Project manager',
                        role4: 'Team lead',
                        platform1: 'Static site',
                        platform2: 'Adaptive site',
                        type1: 'Market place',
                        type2: 'Landing',
                        type3: 'Multi page',
                        urlNotAviable:
                            'Site is currently not publicly available.',
                        old: '(Old design)',
                        timeWork: {
                            title: 'Time spent',
                            Hours1: 'Hours',
                            Hours2: 'Hours',
                            Days1: 'Days',
                            Days2: 'Days',
                            Month1: 'Month',
                            Month2: 'Month',
                            Year: 'Year',
                        },
                    },
                    InfoPage: {
                        description: {
                            description1:
                                'I specialise in front-end development. Being independent, I work with small to large companies, startups, design studios, and creative individuals globally.',
                            description2:
                                'With 5+ years of dedicated experience, I have been involved with crafting digital experiences that captivate and engage. I focus on interaction and offer a meticulous approach to detail-oriented development. I genuinely relish bringing ideas to life, transforming them into bespoke, user-friendly and aesthetically pleasing websites.',
                            description3:
                                'But above all, my biggest passion is forming strong working relationships and genuine bonds with other like-minded, creative people.',
                        },
                        skills: {
                            skillsTitle: 'Skills',
                            skillsText1:
                                'HTML, CSS, JavaScript, React, React Native, Redux, Node.js, Express.js, MongoDB, MySQL, PHP.',
                            skillsText2: 'C++, C#, Java, Python.',
                            skillsText3: 'Figma, Photoshop.',
                            skillsText4: 'Git, GitHub, Trello.',
                            skillsText5:
                                'Responsive Design, Mobile First, Progressive Enhancement.',
                        },
                        experience: {
                            experienceTitle: 'Work experience',
                            experienceText1:
                                'Meat Hammer Studio (2020-2023): Web development, SMM, social media admin, project management.',
                            experienceText2:
                                'Freelance (2023 - now): Web development, CEO, design.',
                        },
                        titleLocation: 'Location',
                        titleContact: 'Contact',
                        location: 'Ivano-Frankivsk, Ukraine',
                        aboutTitle: 'About me',
                        aboutSubtitle:
                            'Fast adaptation, effective time management',
                        aboutText:
                            'Team player, responsible, quickly learn new tech. 3 years of IT experience.',
                    },

                    modal: {
                        ID: 'Id',
                        Year: 'Year',
                        Design: 'Design',
                        Role: 'Role',
                        Tags: 'Technoligies',
                        Platform: 'Platform',
                        Type: 'Type',
                        URL: 'URL',
                        company: 'Company',
                        date: 'Date',
                    },
                    certificate: {
                        title: {
                            title1: 'Responsive Web Design',
                            title2: 'Front End Development Libraries',
                            title3: 'Data Visualization',
                            title4: 'Legacy JavaScript Algorithms and Data Structures',
                            title5: 'Blockchain Foundation',
                            title6: 'Introduction to ESIO - Non-technical',
                            title7: 'Introduction to ESIO - Technical',
                            title8: 'ESIO Developer Envirinment Setup',
                            title9: 'Marketing IT-product',
                        },
                        subTitle: {
                            subTitle1: 'Certificate',
                            subTitle2: 'Course',
                        },
                        company: {
                            company1: 'Genesis',
                            company2: 'ESIO',
                            company3: 'FreeCodeCamp',
                        }
                    },
                },
            },
            uk: {
                translation: {
                    filter: {
                        role: "Роль:",
                        year: "Рік завершення роботи:",
                        time: "Час на роботу:",
                        company: "Компанія:",
                        all: "Всі",
                        timeLessThan10: "Меньше 10 годин",
                        timeLessThan20: "Меньше 20 годин",
                        timeLessThan50: "Меньше 50 годин",
                        timeLessThan100: "Меньше 100 годин",
                        reset: "Скинути фільтри",
                        
                    },
                    navMenu: {
                        logo: 'Андрій Жуков',
                        link1: 'Фронт-енд\n' + 'Розробник',
                        link2: 'Про мене',
                        link3: 'Портфоліо',
                        link4: 'Сертифікати',
                        link5: 'English',
                        link6: 'Українська',
                        link7: 'руский',
                    },
                    theme: {
                        dark: 'Темний режим',
                        light: 'Світлий режим',
                    },
                    portfolioCard: {
                        title: {
                            title1: 'Denis Portfolio',
                            title2: 'Konstruct',
                            title3: 'Fair Partner',
                            title4: 'People Tobacco',
                            title5: 'Meat Hammer Site',
                            title6: 'Manipura',
                            title7: 'Batumi Racing Club',
                            title8: 'Sketch2Site Development',
                            title9: 'Sers',
                            title10: 'Biko Butik',
                            title11: 'Andriy Zhukov',
                            title12: 'Шашличний калькулятор',
                        },
                        description: {
                            description12:
                                "Шашличний калкулятор - сайт для розрахунку кількості м'яса для свята.",
                            description11:
                                'Andriy Zhukov - сайт портфоліо для себе.',
                            description10:
                                'Biko Butik - сайт візитка для інтернет магазину.',
                            description9:
                                'Sers - Сайт виконаний на замовлення іспанської компанії розробки сайтів. Час на розробку - 50 годин. ',
                            description8:
                                'Sketch2Site Development - сайт виконаний на замовлення від міжнародної компанії по розробці сайтів. ',
                            description7:
                                'Batumi Racing Club - сайт створений для грузинського картодрому - найбільшого картодрому в Європі.',
                            description6:
                                'Manipura - сайт візитка для центру йоги. ',
                            description5:
                                'Meat Hammer Site - компанія в якій я працював з 2020 року. Саме це є корпоративний сайт.',
                            description4:
                                'People Tobacco - сайт для компанії яка виготовляє табак для кальяну. ',
                            description3:
                                'Fair Partner - сайт для польскої компанії Fair Partner. Сумістний проект з Meat Hammer Studio',
                            description2:
                                'Konstruct - базовий сайт який є в портфоліо у кожного',
                            description1:
                                'Denis Portfolio - базовий сайт який є в портфоліо у кожного',
                        },
                        subTitle: 'Веб-сайт',
                        role1: 'Розробник',
                        role2: 'Дизайнер',
                        role3: 'Менеджер проекту',
                        role4: 'Керівник команди',
                        platform1: 'Статичний сайт',
                        platform2: 'Адаптивний сайт',
                        type1: 'Магазин',
                        type2: 'Односторінковий сайт',
                        type3: 'Багато сторінковий сайт',
                        urlNotAviable:
                            'На данний момент сайт не знаходиться у відкритому доступі.',
                        old: '(Старий дизайн)',
                        timeWork: {
                            title: 'Витрачено часу',
                            Hours1: 'Години',
                            Hours2: 'Годин',
                            Days1: 'День',
                            Days2: 'Днів',
                            Month1: 'Місяць',
                            Month2: 'Місяців',
                            Year: 'Рік',
                        },
                    },
                    InfoPage: {
                        description: {
                            description1:
                                'Я спеціалізуюсь на фронтенд-розробці. Будучи незалежним, я працюю з малими та великими компаніями, стартапами, дизайн-студіями та творчими людьми по всьому світу.',
                            description2:
                                'Маючи понад 5 років досвіду, я брав участь у створенні цифрового досвіду, який захоплює та захоплює. Я зосереджуюсь на взаємодії та пропоную ретельний підхід до розробки, орієнтованої на деталі. Мені щиро подобається втілювати ідеї в життя, перетворюючи їх на індивідуальні, зручні та естетично привабливі веб-сайти.',
                            description3:
                                'Але, перш за все, моєю найбільшою пристрастю є формування міцних робочих стосунків і справжніх зв’язків з іншими однодумцями, творчими людьми.',
                        },
                        skills: {
                            skillsTitle: 'Навички',
                            skillsText1:
                                'HTML, CSS, JavaScript, React, React Native, Redux, Node.js, Express.js, MongoDB, MySQL, PHP.',
                            skillsText2: 'C++, C#, Java, Python.',
                            skillsText3: 'Figma, Photoshop.',
                            skillsText4: 'Git, GitHub, Trello.',
                            skillsText5:
                                'Responsive Design, Mobile First, Progressive Enhancement.',
                        },
                        experience: {
                            experienceTitle: 'Досвід роботи',
                            experienceText1:
                                'Meat Hammer Studio (2020-2023): Web-розробка, SMM, адміністрування соцмереж, управління проектами.',
                            experienceText2:
                                'Фріланс (2023 - зараз): Web-розробка, CEO, дизайн.',
                        },
                        titleLocation: 'Локація',
                        titleContact: 'Контаки',
                        location1: 'Івано-Франківськ, Україна',
                        location2: 'Херсон, Україна',
                        aboutTitle: 'Про себе',
                        aboutSubtitle:
                            'Швидка адаптація, ефективне планування часу',
                        aboutText:
                            'Командний гравець, відповідальний, швидко навчаюсь новим технологіям. Досвід в IT — 5 років.',
                    },
                    modal: {
                        ID: 'Id',
                        Year: 'Рік',
                        Design: 'Дизайн',
                        Role: 'Роль',
                        Tags: 'Технології',
                        Platform: 'Платформа',
                        Type: 'Тип',
                        URL: 'Посилання',
                        description: 'Опис',
                        company: 'Компанія',
                        date: 'Дата',
                    },
                    certificate: {
                        title: {
                            title1: 'Адаптивний веб-дизайн',
                            title2: 'Бібліотеки Front-End розробки',
                            title3: 'Візуалізація даних',
                            title4: 'Класичні алгоритми та структури даних на JavaScript',
                            title5: 'Основи блокчейна',
                            title6: 'Введення в ESIO - нетехнічне',
                            title7: 'Введення в ESIO - технічне',
                            title8: 'Налаштування середовища розробника ESIO',
                            title9: 'Маркетинг IT-продукту',
                            
                        },
                        subTitle: {
                            subTitle1: 'Сертифікат',
                            subTitle2: 'Курс',
                        },
                        company: {
                            company1: 'Genesis',
                            company2: 'ESIO',
                            company3: 'FreeCodeCamp',
                        }
                    },
                },
            },
            ru: {
                translation: {
                    filter: {
                        "role": "Роль:",
                        "year": "Год завершения работы:",
                        "time": "Время на работу:",
                        "all": "Все",
                        "timeLessThan10": "Меньше 10 часов",
                        "timeLessThan20": "Меньше 20 часов",
                        "timeLessThan50": "Меньше 50 часов",
                        "timeLessThan100": "Меньше 100 часов",
                        "reset": "Сбросить фильтры",
                    },
                    navMenu: {
                        logo: 'Андрей Жуков',
                        link1: 'Фронт-енд\n' + 'Разработчик',
                        link2: 'Про меня',
                        link3: 'Портфолио',
                        link4: 'Сертификати',
                        link5: 'English',
                        link6: 'Українська',
                        link7: 'руский',
                        link8: 'Темный режим',
                        link9: 'Светлый режим',
                    },
                    theme: {
                        dark: 'Темный режим',
                        light: 'Светлый режим',
                    },
                    portfolioCard: {
                        title: {
                            title1: 'Denis Portfolio',
                            title2: 'Konstruct',
                            title3: 'Fair Partner',
                            title4: 'People Tobacco',
                            title5: 'Meat Hammer Site',
                            title6: 'Manipura',
                            title7: 'Batumi Racing Club',
                            title8: 'Sketch2Site Development',
                            title9: 'Sers',
                            title10: 'Biko Butik',
                            title11: 'Andriy Zhukov',
                            title12: 'Шашлычный калькулятор',
                        },
                        description: {
                            description12:
                                'Шашлычный калькулятор - сайт для расчета количества мяса на праздник.',
                            description11:
                                'Andriy Zhukov - сайт портфолио для себя.',
                            description10:
                                'Biko Butik - сайт визитка для онлайн магазина.',
                            description9:
                                'Sers - Сайт, разработанный по заказу испанской компании по созданию сайтов. Время разработки – 50 часов.',
                            description8:
                                'Sketch2Site Development - Сайт, созданный по заказу международной компании по разработке сайтов.',
                            description7:
                                'Batumi Racing Club - Сайт, созданный для грузинского картодрома, самого большого картодрома в Европе.',
                            description6:
                                'Manipura - Визитный сайт для центра йоги.',
                            description5:
                                'Meat Hammer Site - Компания, в которой я работал с 2020 года. Это её корпоративный сайт.',
                            description4:
                                'People Tobacco - Сайт для компании, производящей табак для кальяна.',
                            description3:
                                'Fair Partner - Сайт для польской компании Fair Partner. Совместный проект с Meat Hammer Studio.',
                            description2:
                                'Konstruct - Базовый сайт, который есть в портфолио у каждого.',
                            description1:
                                'Denis Portfolio - Базовый сайт, который есть в портфолио у каждого.',
                        },
                        subTitle: 'Веб-сайт',
                        role1: 'Разработчик',
                        role2: 'Дизайнер',
                        role3: 'Менеджер проекту',
                        role4: 'Руководитель команды',
                        platform1: 'Статичный сайт',
                        platform2: 'Адаптивный сайт',
                        type1: 'Магазин',
                        type2: 'Одностраничный сайт',
                        type3: 'Многостраничный сайт',
                        urlNotAviable:
                            'На данный момент сайт не находиться в открытом доступе.',
                        old: '(Старый дизайн)',
                        timeWork: {
                            title: 'Потрачено времени',
                            Hours1: 'Час',
                            Hours2: 'Часов',
                            Days1: 'День',
                            Days2: 'Дней',
                            Month1: 'Месяц',
                            Month2: 'Месяцев',
                            Year: 'Год',
                        },
                    },
                    InfoPage: {
                        description: {
                            description1:
                                'Я специализируюсь на фронтенд-разработке. Будучи независимым, я работаю с небольшими и крупными компаниями, стартапами, дизайн-студиями и творческими личностями по всему миру.',
                            description2:
                                'Имея более чем 5-летний опыт работы, я занимаюсь созданием цифровых впечатлений, которые увлекают и привлекают. Я фокусируюсь на взаимодействии и предлагаю тщательный подход к разработке, ориентированной на детали. Мне искренне нравится воплощать идеи в жизнь, превращая их в индивидуальные, удобные и эстетически приятные веб-сайты.',
                            description3:
                                'Но, прежде всего, моей самой большой страстью является формирование прочных рабочих отношений и подлинных связей с другими творческими людьми-единомышленниками.',
                        },
                        skills: {
                            skillsTitle: 'Навыки',
                            skillsText1:
                                'HTML, CSS, JavaScript, React, React Native, Redux, Node.js, Express.js, MongoDB, MySQL, PHP.',
                            skillsText2: 'C++, C#, Java, Python.',
                            skillsText3: 'Figma, Photoshop.',
                            skillsText4: 'Git, GitHub, Trello.',
                            skillsText5:
                                'Responsive Design, Mobile First, Progressive Enhancement.',
                        },
                        experience: {
                            experienceTitle: 'Опыт работы',
                            experienceText1:
                                'Meat Hammer Studio (2020-2023): Web-разработка, SMM, администрирование соцсетей, управление проектами.',
                            experienceText2:
                                'Фриланс (2023 - сейчас): Web-разработка, CEO, дизайн.',
                        },
                        titleLocation: 'Локация',
                        titleContact: 'Контакты',
                        location: 'Ивано-Франковск, Украина',
                        description1:
                            'Я специализируюсь на фронтенд-разработке. Будучи независимым, я работаю с небольшими и крупными компаниями, стартапами, дизайн-студиями и творческими личностями по всему миру..',
                        description2:
                            'Имея более чем 5-летний опыт работы, я занимаюсь созданием цифровых впечатлений, которые увлекают и привлекают. Я фокусируюсь на взаимодействии и предлагаю тщательный подход к разработке, ориентированной на детали. Мне искренне нравится воплощать идеи в жизнь, превращая их в индивидуальные, удобные и эстетически приятные веб-сайты.',
                        description3:
                            'Но, прежде всего, моей самой большой страстью является формирование прочных рабочих отношений и подлинных связей с другими творческими людьми-единомышленниками..',
                        aboutTitle: 'О себе',
                        aboutSubtitle:
                            'Быстрая адаптация, эффективное управление временем',
                        aboutText:
                            'Ответственный, быстро обучаюсь новым технологиям. Опыт в IT - 5 лет.',
                    },
                    modal: {
                        ID: 'Id',
                        Year: 'Год',
                        Design: 'Дизайн',
                        Role: 'Роль',
                        Tags: 'Тегнологии',
                        Platform: 'Платформа',
                        Type: 'Тип',
                        URL: 'Ссылка',
                        company: 'Компания',
                        date: 'Дата',
                    },
                    certificate: {
                        title: {
                            title1: 'Адаптивный веб-дизайн',
                            title2: 'Библиотеки Front-End разработки',
                            title3: 'Визуализация данных',
                            title4: 'Классические алгоритмы и структуры данных на JavaScript',
                            title5: 'Основы блокчейна',
                            title6: 'Введение в ESIO — нетехническое',
                            title7: 'Введение в ESIO — техническое',
                            title8: 'Настройка среды разработчика ESIO',
                            title9: 'Маркетинг IT-продукта',
                        },
                        subTitle: {
                            subTitle1: 'Сертификат',
                            subTitle2: 'Курс',
                        },
                        company: {
                            company1: 'Genesis',
                            company2: 'ESIO',
                            company3: 'FreeCodeCamp',
                        }
                    },
                },
            },
        },
    });

export default i18n;
