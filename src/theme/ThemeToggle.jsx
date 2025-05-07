import { themeDB } from '@/api/navigation/theme';

const ThemeToggle = ({ setThemes, theme }) => {
    console.log('Current theme:', theme); // Проверяем текущее значение темы

    const themesList = themeDB.map((el) => {
        console.log('Checking:', el.value, '===', theme, el.value === theme); // Отладка
        const toggleTheme = (newTheme) => {
            setTheme(newTheme);
        };

        return (
            <div
                key={el.id}
                onClick={() => {
                    setThemes(el.value);
                }}
            >
                <p
                    className={`navbar__nav__link ${el.value === theme ? 'active_li' : ''}`}
                >
                    {el.title}
                </p>
            </div>
        );
    });

    return <div>{themesList}</div>;
};

export default ThemeToggle;
