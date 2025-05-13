export interface IFiltersProps {
    roles: { key: string; label: string }[];
    uniqueYears: string[];
    selectedRole: string;
    selectedYear: string;
    onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onReset: () => void;
}
