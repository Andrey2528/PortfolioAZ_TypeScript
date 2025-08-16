// Інтерфейс для сертифікатів з Firebase
export interface IFirebaseCertificate {
    id: string | number;
    title: string; // certificate.title.title2
    subTitle: string; // certificate.subTitle.subTitle1
    img: string; // URL зображення
    company: string; // FreeCodeCamp
    date: string; // 2022-03-19
}

// Інтерфейс для нормалізованих сертифікатів
export interface INormalizedCertificate {
    id: string;
    title: string; // перекладений заголовок
    subTitle: string; // перекладений підзаголовок
    img: string;
    company: string;
    date: string;
}
