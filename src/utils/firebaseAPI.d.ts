// src/utils/firebaseAPI.d.ts

export interface PortfolioItem {
    id: string;
    title: string;
    subTitle: string;
    img: string;
    numericId: number;
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
    normalizedRole: string[];
    normalizedCompany: string;
}

export interface CertificateItem {
    id: string;
    title: Record<string, any> | string;
    description: Record<string, any> | string;
    image: string;
    issuer: string;
    issueDate: string;
    credentialUrl: string;
    category: string;
}

export interface SkillItem {
    id: string;
    name: Record<string, any> | string;
    level: number;
    category: string;
    icon: string;
    order: number;
}

export interface ProfileData {
    id: string;
    [key: string]: any;
}

export interface AllData {
    portfolio: PortfolioItem[];
    certificates: CertificateItem[];
    skills: SkillItem[];
    socialLinks: any[]; // якщо знаєш структуру, можна уточнити
    profile: ProfileData | null;
}

export function fetchPortfolioData(): Promise<PortfolioItem[]>;
export function fetchCertificatesData(): Promise<CertificateItem[]>;
export function fetchSkillsData(): Promise<SkillItem[]>;
export function fetchSocialLinksData(): Promise<any[]>;
export function fetchProfileData(): Promise<ProfileData | null>;
export function fetchAllData(): Promise<AllData>;

export function normalizePortfolioData(data: any): PortfolioItem[];
export function normalizeCertificatesData(data: any): CertificateItem[];
export function normalizeSkillsData(data: any): SkillItem[];
