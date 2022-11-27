import { ChangeEvent, FocusEvent, FC, useCallback } from 'react';

import { useFormikContext } from 'formik';
import { startCase } from 'lodash';

import IntakeInput from 'components/intake/IntakeInput';

import { IntakeInitialValues } from 'utils/intake/initialValues';

const name = 'name' as const;

const IntakeNameInput: FC = () => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext<IntakeInitialValues>();

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (!values[name]) setFieldTouched(name);

      if (value.endsWith(' ') && value.length > 1) return setFieldValue(name, value);

      setFieldValue(name, startCase(value));
    },
    [setFieldTouched, setFieldValue, values]
  );

  const handleBlur = useCallback(
    ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
      setFieldValue(name, startCase(value));
    },
    [setFieldValue]
  );

  return (
    <IntakeInput
      className="name"
      name="name"
      placeholder="John Doe"
      label="Full legal name"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default IntakeNameInput;
