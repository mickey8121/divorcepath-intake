import { useCallback, FC, useMemo } from 'react';

import classnames from 'classnames';
import { getIn, useFormikContext } from 'formik';

import Button from 'components/common/Button';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

export interface Button {
  value: string | boolean;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface Props {
  name: string;
  button: Button;
  value?: string;
  color?: string;
  size?: string;
  disabled?: boolean;
}

const ToggleButton: FC<Props> = ({ button, name, size, color, disabled }) => {
  const { isCompleted } = useInterviewOptions();

  const { setFieldValue, setFieldTouched, values } = useFormikContext();
  const { value: buttonValue, label: buttonLabel, disabled: buttonDisabled, onClick } = button;

  const value = useMemo(() => getIn(values, name), [values, name]);

  const handleClick = useCallback(
    e => {
      e.stopPropagation();

      if (onClick && !(disabled || buttonDisabled)) {
        onClick();
        return;
      }

      setFieldValue(name, buttonValue);
      setTimeout(() => setFieldTouched(name, true), 0);
    },
    [buttonValue, disabled, buttonDisabled, name, onClick, setFieldTouched, setFieldValue]
  );

  return (
    <Button
      color={color}
      size={size}
      key={buttonValue.toString()}
      value={buttonValue.toString()}
      disabled={disabled || buttonDisabled || isCompleted}
      className={classnames({
        disabled: disabled || buttonDisabled,
        active: buttonValue === value
      })}
      onClick={handleClick}
    >
      {buttonLabel}
    </Button>
  );
};

export default ToggleButton;
