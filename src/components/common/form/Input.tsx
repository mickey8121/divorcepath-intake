import { useMemo, FC, useCallback, useState, useEffect } from 'react';

import classnames from 'classnames';
import { useField, ErrorMessage, useFormikContext } from 'formik';
import {
  FormGroup,
  Input as RSInput,
  FormFeedback,
  Label,
  InputProps as RSInputProps
} from 'reactstrap';
import { useDebouncedCallback } from 'use-debounce';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

export interface InputProps extends RSInputProps {
  label?: string;
  inputClassName?: string;
  name: string;
  hideIsShort?: boolean;
}

const Input: FC<InputProps> = ({
  id,
  label,
  placeholder: customPlaceholder,
  children,
  className,
  inputClassName,
  name,
  hideIsShort,
  ...props
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const { isCompleted } = useInterviewOptions();

  const [field, { error, touched, value }] = useField(name);

  const placeholder = useMemo(() => customPlaceholder || label, [customPlaceholder, label]);

  const { shortInterview } = useInterviewOptions();

  const [cachedValue, setCachedValue] = useState('');

  // When value arrives from props we need to set it to cache
  useEffect(() => {
    if (value === undefined) {
      setCachedValue('');
    } else {
      setCachedValue(value as string);
    }
  }, [name, value]);

  const handleChange = useDebouncedCallback(e => {
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true);
  }, 400);

  const cachedHandleChange = useCallback(
    e => {
      if (e.persist) {
        e.persist();
      }

      const newValue = e.currentTarget.value || e.target.value;

      setCachedValue(newValue as string);
      handleChange(e);
    },
    [handleChange]
  );

  if (shortInterview && hideIsShort) return null;

  return (
    <FormGroup className={classnames(className, 'input form-group', { error: error && touched })}>
      {label && (
        <Label for={id || name} className="label">
          {label}
        </Label>
      )}
      <RSInput
        invalid={!!(error && touched)}
        {...field}
        {...props}
        id={id}
        value={cachedValue || ''}
        placeholder={placeholder}
        className={classnames(inputClassName, { valid: !error && value })}
        name={name}
        onChange={cachedHandleChange}
        disabled={props.disabled || isCompleted}
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

export default Input;
