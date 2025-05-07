export interface IPortfolioCardPreview {
    id: string;
    title: string;
    subTitle: string;
    img: string;
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
}
