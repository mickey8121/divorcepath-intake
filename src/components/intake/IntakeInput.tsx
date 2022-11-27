import { FC, FocusEvent, useCallback, useEffect } from 'react';

import { useFormikContext } from 'formik';
import classnames from 'classnames';

import Input, { InputProps } from 'components/common/form/Input';

import { IntakeInitialValues } from 'utils/intake/initialValues';

interface IntakeInputProps extends InputProps {
  name: keyof IntakeInitialValues;
}

const IntakeInput: FC<IntakeInputProps> = ({ className, onBlur, name, ...props }) => {
  const { values, setFieldTouched, validateField } = useFormikContext<IntakeInitialValues>();

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(event);

      if (!values[name]) return setFieldTouched(name, false, true);

      setFieldTouched(name, true, true);
    },
    [name, onBlur, setFieldTouched, values]
  );

  useEffect(() => {
    if (values[name]) {
      validateField(name);
      setFieldTouched(name, true, true);
    }
  }, [name, setFieldTouched, validateField, values]);

  return (
    <Input
      className={classnames(className, {
        empty: !values[name]
      })}
      onBlur={handleBlur}
      name={name}
      {...props}
    />
  );
};

export default IntakeInput;
