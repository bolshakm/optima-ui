export interface IWorkingHours {
    Thu: string;
    Tue: string;
    Wed: string;
    Sat: string;
    Fri: string;
    Mon: string;
    Sun: string;
}

export type Language = 'en' | 'es';

export interface ICafe {
    name: string;
    defLang: Language;
    banner: string;
    address: string;
    workingHours: IWorkingHours;
    facebook: string;
    instagram: string;
    tripAdvisor: string;
    googleReview: string;
  }