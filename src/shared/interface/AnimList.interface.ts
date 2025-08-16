import { animationSertificateProps } from '@/shared/config/animation.config';
export interface IAnimListProps<T> {
    items: T[];
    keyExtractor: (item: T) => string | number;
    renderItem: (item: T) => JSX.Element;
    className?: string;
    animationConfig?: typeof animationSertificateProps;
}
