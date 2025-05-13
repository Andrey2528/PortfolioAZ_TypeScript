import { useTranslation } from 'react-i18next';
import { IFiltersProps } from '@/shared/interface/interfaceFilterProps';

const Filters: React.FC<IFiltersProps> = ({
    roles,
    uniqueYears,
    selectedRole,
    selectedYear,
    onRoleChange,
    onYearChange,
    onReset,
}) => {
    const { t } = useTranslation();

    return (
        <div className="filter__container">
            <div className="filter__group">
                <label htmlFor="roleFilter" className="filter__label">
                    {t('filter.role')}
                </label>
                <select
                    id="roleFilter"
                    value={selectedRole}
                    onChange={onRoleChange}
                    className="filter__select"
                >
                    <option value="">{t('filter.all')}</option>
                    {roles.map((role) => (
                        <option key={role.key} value={role.key}>
                            {role.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter__group">
                <label htmlFor="yearFilter" className="filter__label">
                    {t('filter.year')}
                </label>
                <select
                    id="yearFilter"
                    value={selectedYear}
                    onChange={onYearChange}
                    className="filter__select"
                >
                    <option value="">{t('filter.all')}</option>
                    {uniqueYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={onReset} className="filter__reset">
                {t('filter.reset')}
            </button>
        </div>
    );
};

export default Filters;
