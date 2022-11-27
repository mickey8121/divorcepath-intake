import { FC } from 'react';

import { ErrorMessage, useFormikContext } from 'formik';
import { ButtonGroup, FormFeedback, FormGroup, Label } from 'reactstrap';

import ToggleButton, { Button } from 'components/common/form/ToggleButton';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

interface Props {
  buttons: Button[];
  name: string;
  disabled?: boolean;
  label?: string;
  size?: string;
  color?: string;
  value?: string;
  hideIsShort?: boolean;
}

const ToggleButtons: FC<Props> = ({
  buttons,
  disabled,
  children,
  label,
  name,
  value,
  hideIsShort,

  size = 'lg',
  color = 'secondary'
}) => {
  const { shortInterview } = useInterviewOptions();

  const { isSubmitting } = useFormikContext();

  if (shortInterview && hideIsShort) return null;

  return (
    <FormGroup className="toggle-buttons form-group">
      {label && (
        <Label for={name} className="label">
          {label}
        </Label>
      )}
      <ButtonGroup className="custom-btn-group" disabled={disabled || isSubmitting} name={name}>
        {buttons.map(button => (
          <ToggleButton
            key={button.value.toString()}
            button={button}
            size={size}
            color={color}
            value={value}
            disabled={disabled}
            name={name}
          />
        ))}
      </ButtonGroup>
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

export default ToggleButtons;
