import { useTranslation } from 'react-i18next';
import { IFiltersProps } from '@/shared/interface/FilterProps.interface';

const Filters: React.FC<IFiltersProps> = ({
    roles,
    uniqueYears,
    selectedRole,
    selectedYear,
    selectedSort,
    onRoleChange,
    onYearChange,
    onSortChange,
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

            <div className="filter__group">
                <label htmlFor="sortFilter" className="filter__label">
                    {t('filter.sort')}
                </label>
                <select
                    id="sortFilter"
                    value={selectedSort || 'id-desc'}
                    onChange={onSortChange || (() => {})}
                    className="filter__select"
                >
                    <option value="id-asc">{t('filter.sortByIdAsc')}</option>
                    <option value="id-desc">{t('filter.sortByIdDesc')}</option>
                    <option value="year-asc">
                        {t('filter.sortByDateAsc')}
                    </option>
                    <option value="year-desc">
                        {t('filter.sortByDateDesc')}
                    </option>
                    <option value="name-asc">
                        {t('filter.sortByNameAsc')}
                    </option>
                    <option value="name-desc">
                        {t('filter.sortByNameDesc')}
                    </option>
                </select>
            </div>

            <button onClick={onReset} className="filter__reset">
                {t('filter.reset')}
            </button>
        </div>
    );
};

export default Filters;
