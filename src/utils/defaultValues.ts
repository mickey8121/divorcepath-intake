import { Children, ChildSupportType, Gender, Parenting } from 'generated/graphql';

export const defaultChild: Children = {
  id: '',
  firstName: 'Child',
  gender: 'MALE' as Gender,
  birthDate: new Date().toISOString(),
  parenting: 'SHARED' as Parenting,
  supportType: 'GUIDELINE' as ChildSupportType,
  childIncome: 0,
  createdAt: undefined,
  isOfRelationship: true,
  supportDeductible: false,
  updatedAt: undefined
};

export const genderButtons = [
  {
    value: 'FEMALE',
    label: 'Female'
  },
  {
    value: 'MALE',
    label: 'Male'
  }
];

export const toggleButtons = [
  {
    value: true,
    label: 'Yes'
  },
  {
    value: false,
    label: 'No'
  }
];

export const parentingButtons = [
  {
    value: 'CLIENT',
    label: 'Client'
  },
  {
    value: 'SHARED',
    label: 'Shared'
  },
  {
    value: 'EX',
    label: 'Ex'
  }
];

export const supportedByButtons = [
  {
    value: 'CLIENT',
    label: 'Client'
  },
  {
    value: 'EX',
    label: 'Ex'
  }
];

export const supportTypeButtons = [
  {
    value: 'GUIDELINE',
    label: 'Guideline'
  },
  {
    value: 'SPECIAL',
    label: 's. 7 Expenses'
  },
  {
    value: 'OTHER',
    label: 'Other'
  }
];
