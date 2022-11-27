import { IntakeInterview } from 'generated/graphql';

const initialValues: IntakeInterview = {
  id: '',
  legalIssues: [],
  profile: {
    id: '',
    birthDate: null,
    disabled: null,
    email: null,
    firstName: null,
    gender: null,
    hasNewPartner: null,
    lastName: null,
    northernResident: null,
    partnerIncome: null,
    phone: null,
    residence: null,
    ruralResident: null
  },
  exProfile: {
    id: '',
    birthDate: null,
    disabled: null,
    email: null,
    firstName: null,
    gender: null,
    hasNewPartner: null,
    lastName: null,
    northernResident: null,
    partnerIncome: null,
    phone: null,
    residence: null,
    ruralResident: null
  },
  address: {
    city: null,
    country: null,
    postal: null,
    residence: null,
    street1: null
  },
  exAddress: {
    city: null,
    country: null,
    postal: null,
    residence: null,
    street1: null
  },
  children: [],
  exLawyer: false,
  exLawyerName: null,
  exLawyerCompanyName: null,
  story: null,
  askStory: true,
  shortInterview: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const getInitialValuesFromLocalStorage = (): IntakeInterview => {
  if (typeof window !== 'object') return initialValues;

  const stringValues = localStorage.getItem('interviewData');

  try {
    const values = JSON.parse(stringValues || '');

    if (typeof values !== 'object') return initialValues;

    return values;
  } catch (err) {
    return initialValues;
  }
};

export default initialValues;
