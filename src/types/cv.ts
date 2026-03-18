
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
}

export interface SkillSet {
  id: string;
  category: string;
  items: string[];
}

export interface CVData {
  id?: string;
  userId?: string;
  title: string;
  lastUpdated: number;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillSet[];
  summary: string;
}

export const emptyCV: CVData = {
  title: "My Professional Resume",
  lastUpdated: Date.now(),
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
  },
  experience: [],
  education: [],
  skills: [],
  summary: "",
};
