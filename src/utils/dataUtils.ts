import { IPortfolioCardFull } from '../shared/interface/interfaceCard';

/**
 * Нормализует данные карточки портфолио, полученные из Firebase
 * Преобразует i18n ключи и различные типы данных в единый формат
 */
export const normalizePortfolioCard = (card: any): IPortfolioCardFull => {
    // Нормализация поля type - может быть строкой или массивом
    let normalizedType: string[] = [];
    if (card.type) {
        if (Array.isArray(card.type)) {
            normalizedType = card.type;
        } else if (typeof card.type === 'string') {
            // Если строка содержит запятые - разделяем по запятым
            normalizedType = card.type
                .split(',')
                .map((t: string) => t.trim())
                .filter((t: string) => t);
        }
    }

    // Нормализация поля tag - в базе это массив, в интерфейсе строка
    let normalizedTag = '';
    if (card.tag) {
        if (Array.isArray(card.tag)) {
            normalizedTag = card.tag.join(', ');
        } else if (typeof card.tag === 'string') {
            normalizedTag = card.tag;
        }
    }

    // Нормализация timeToEndWork - в базе это объект с unit и value
    let normalizedTimeToEndWork = '';
    if (card.timeToEndWork && typeof card.timeToEndWork === 'object') {
        const { value, unit } = card.timeToEndWork;
        if (value && unit) {
            normalizedTimeToEndWork = `${value} ${unit}`;
        }
    } else if (typeof card.timeToEndWork === 'string') {
        normalizedTimeToEndWork = card.timeToEndWork;
    }

    // Функция для получения значения (может быть i18n ключом или обычной строкой)
    const getValue = (value: any): string => {
        if (typeof value === 'string') {
            return value;
        }
        return '';
    };

    return {
        id: card.id || '',
        title: getValue(card.title),
        subTitle: getValue(card.subTitle),
        img: card.img || '',
        year: Number(card.year) || new Date().getFullYear(),
        design: getValue(card.design) || '-',
        role: getValue(card.role),
        tag: normalizedTag,
        platform: getValue(card.platform),
        type: normalizedType,
        url: card.url || '',
        description: getValue(card.description),
        timeToEndWork: normalizedTimeToEndWork,
        company: card.company || getValue(card.company) || '',
        data: card.data || card.date || '',
        normalizedRole: card.normalizedRole,
        normalizedCompany: card.normalizedCompany,
    };
};

/**
 * Нормализует массив карточек портфолио
 */
export const normalizePortfolioCards = (cards: any[]): IPortfolioCardFull[] => {
    return cards.map(normalizePortfolioCard);
};

/**
 * Подготавливает данные для сохранения в Firebase
 * Преобразует данные из формы в формат базы данных
 */
export const prepareCardDataForSave = (
    formData: Partial<IPortfolioCardFull>,
): any => {
    // Преобразование tag из строки в массив
    let tagArray: string[] = [];
    if (formData.tag && typeof formData.tag === 'string') {
        tagArray = formData.tag
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t);
    }

    // Преобразование timeToEndWork в объект если это строка с числом
    let timeToEndWorkObj: any = formData.timeToEndWork;
    if (typeof formData.timeToEndWork === 'string') {
        const match = formData.timeToEndWork.match(/(\d+)\s*(.+)/);
        if (match) {
            timeToEndWorkObj = {
                value: parseInt(match[1]),
                unit: match[2].trim(),
            };
        }
    }

    return {
        ...formData,
        tag: tagArray.length > 0 ? tagArray : formData.tag || '',
        timeToEndWork: timeToEndWorkObj,
        type: formData.type || [],
    };
};
