export interface IPortfolioCardPreview {
    id: string;
    title: string;
    subTitle: string;
    img: string;
    numericId?: number;
}

export interface IPortfolioCardFull extends IPortfolioCardPreview {
    year: number;
    design: string;
    role: string;
    tag: string;
    platform: string;
    type: string[];
    url: string;
    description: string;
    timeToEndWork: string;
    company: string;
    data: string;
    normalizedRole?: string[];
    normalizedCompany?: string;
    numericId?: number;
}

export interface ICardProps<T> {
    card: T;
    openModal: (card: T) => void;
    titleKey: keyof T;
    subTitleKey: keyof T;
    imgKey: keyof T;
    idKey: keyof T;
}

export interface IRenderCardProps {
    card: IPortfolioCardFull;
    index: number;
    observerRef: React.MutableRefObject<IntersectionObserver | null>;
    visibleCards: Set<number>;
    openModal: (card: IPortfolioCardFull) => void;
}
