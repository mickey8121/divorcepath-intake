import { FC, useCallback, useMemo } from 'react';

import { ErrorMessage, useField, useFormikContext } from 'formik';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import ReactSelect, { Props } from 'react-select';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

export interface InputProps extends Props {
  label?: string;
  inputClassName?: string;
  name: string;
}

interface Option {
  label?: string;
  value?: string;
}

const Select: FC<InputProps> = ({ children, label, name, isMulti, ...props }) => {
  const [{ value }] = useField(name);
  const formik = useFormikContext();

  const { isCompleted } = useInterviewOptions();

  const { setFieldValue, setFieldTouched } = formik;

  const handleSelect = useCallback(
    selectValue => {
      if (isMulti) {
        setFieldValue(name, selectValue, false);
      } else {
        setFieldValue(name, selectValue.value, false);
        setFieldTouched(name, true, false);
      }
    },
    [isMulti, name, setFieldTouched, setFieldValue]
  );

  const selectedValue = useMemo(() => {
    if (!value) return undefined;
    if (isMulti) return value;

    const currentValue = props?.options?.find(opt => (opt as Option)?.value === value) as Option;

    return {
      value,
      label: currentValue?.label
    };
  }, [isMulti, props?.options, value]);

  return (
    <FormGroup className="select form-group">
      {label && (
        <Label for={name} className="label">
          {label}
        </Label>
      )}
      <ReactSelect
        instanceId={name}
        onChange={handleSelect}
        isMulti={isMulti}
        value={selectedValue}
        {...props}
        isDisabled={props.isDisabled || isCompleted}
        classNamePrefix="custom-select"
      />
      {children}
      <ErrorMessage name={name}>
        {message => (
          <FormFeedback>
            <p className="invalid-message">{message}</p>
          </FormFeedback>
        )}
      </ErrorMessage>
    </FormGroup>
  );
};

export default Select;
