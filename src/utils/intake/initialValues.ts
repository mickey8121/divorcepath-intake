export interface IntakeInitialValues {
  name: string;
  phone: string;
  email: string;
  issue: string;
  privacy: boolean;
}

const initialValues: IntakeInitialValues = {
  name: '',
  phone: '',
  email: '',
  issue: '',
  privacy: false
};

export const getInitialValuesFromLocalStorage = (): IntakeInitialValues => {
  if (typeof window !== 'object') return initialValues;

  const stringValues = localStorage.getItem('formState');

  try {
    const values = JSON.parse(stringValues || '');

    if (typeof values !== 'object') return initialValues;

    const initialKeys = Object.keys(initialValues);
    const localKeys = Object.keys(values as object);

    const isTrueValues = localKeys.every(key => initialKeys.includes(key));

    if (!isTrueValues) return initialValues;

    return { ...values, privacy: false };
  } catch (err) {
    return initialValues;
  }
};

export default initialValues;
