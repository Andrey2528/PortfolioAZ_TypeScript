export interface ModalFieldConfig<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'link' | 'list';
    transform?: (value: any) => string | null;
}
