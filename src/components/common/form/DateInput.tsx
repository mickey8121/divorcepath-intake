import { FC, useCallback, useMemo } from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';
import { ErrorMessage, getIn, useFormikContext } from 'formik';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import RDatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

interface Props {
  name: string;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
  isInvalid?: boolean;
  hideIsShort?: boolean;
  handleChange?: (date: string) => void;
}

const DateInput: FC<Props> = ({
  children,
  disabled,
  name,
  label,
  isInvalid,
  maxDate,
  minDate,
  hideIsShort,
  handleChange
}) => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext();
  const value = useMemo<Date>(() => getIn(values, name), [name, values]);

  const customHandleChange = useCallback(
    (inputValue: Date) => {
      if (handleChange) handleChange(inputValue.toISOString());
      else {
        setFieldValue(name, inputValue.toISOString());

        setTimeout(() => {
          setFieldTouched(name, true);
        }, 0);
      }
    },
    [setFieldValue, name, setFieldTouched, handleChange]
  );

  const { shortInterview, isCompleted } = useInterviewOptions();

  if (shortInterview && hideIsShort) return null;

  return (
    <FormGroup className="date-input form-group">
      {label && (
        <Label for={name} className="label">
          {label}
        </Label>
      )}
      <RDatePicker
        customInput={<InputMask mask="9999-99-99" />}
        name={name}
        selected={dayjs(value).isValid() ? dayjs(value).toDate() : null}
        onChange={customHandleChange}
        onYearChange={customHandleChange}
        onMonthChange={customHandleChange}
        maxDate={maxDate}
        minDate={minDate}
        className={classnames('custom-date-picker', { 'is-invalid': isInvalid })}
        placeholderText="YYYY-MM-DD"
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        disabled={disabled || isCompleted}
        autoComplete="off"
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

export default DateInput;
