export interface IWorkingHours {
    Thu: string;
    Tue: string;
    Wed: string;
    Sat: string;
    Fri: string;
    Mon: string;
    Sun: string;
}

export type Language = 'EN' | 'ES' | 'CA' | 'FR' | 'UA' | 'IT' | 'DE';

export interface ICafe {
    name: string;
    languageSet: Language[]
    defLang: string;
    banner: string;
    address: string;
    workingHours: IWorkingHours;
    facebook: string;
    instagram: string;
    tripAdvisor: string;
    googleReview: string;
  }