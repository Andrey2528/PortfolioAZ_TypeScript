import { themeDB } from '@/shared/constants/navigation/theme';

const ThemeToggle = ({ setThemes, theme }) => {
    const themesList = themeDB.map((el) => {
        console.log('Current theme:', theme, 'Element value:', el.value);

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
