export interface IModalField<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'link' | 'list';
    transform?: (value: any) => string | null;
}

export interface IModalFieldConfig<T> {
    key: keyof T;
    label: string;
    type?: 'link' | 'list' | 'text';
    transform?: (value: any) => any;
}

export interface IModalProps<T> {
    card: T | null;
    onClose: () => void;
    config?: IModalFieldConfig<T>[];
    titleKey?: keyof T;
    subTitleKey?: keyof T;
    imgKey?: keyof T;
}
