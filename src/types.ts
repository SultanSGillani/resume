export interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  picture: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  location: {
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: ResumeProfile[];
}

export interface ResumeWork {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights: string[];
}

export interface ResumeSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface ResumeLanguage {
  language: string;
  fluency: string;
}

export interface ResumeAward {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  work: ResumeWork[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  awards: ResumeAward[];
}
