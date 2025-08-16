import { IPortfolioCardFull } from '../interface/Card.interface';
import { IModalField } from '../interface/Modal.interface';

const modalConfig: IModalField<IPortfolioCardFull>[] = [
    { key: 'id', label: 'modal.ID', type: 'text' },
    { key: 'year', label: 'modal.Year', type: 'text' },
    { key: 'design', label: 'modal.Design', type: 'text' },
    { key: 'role', label: 'modal.Role', type: 'list' },
    { key: 'tag', label: 'modal.Tags', type: 'list' },
    { key: 'platform', label: 'modal.Platform', type: 'text' },
    { key: 'type', label: 'modal.Type', type: 'text' },
    {
        key: 'url',
        label: 'modal.URL',
        type: 'link',
        transform: (value: string) =>
            value && value !== 'portfolioCard.urlNotAviable' ? value : null,
    },
    { key: 'description', label: 'modal.description', type: 'text' },
    {
        key: 'timeToEndWork',
        label: 'portfolioCard.timeWork.title',
        type: 'text',
    },
    { key: 'company', label: 'modal.company', type: 'text' },
    { key: 'date', label: 'modal.date', type: 'text' },
];

export default modalConfig;
