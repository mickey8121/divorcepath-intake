import { FC } from 'react';

import Input from 'components/common/form/Input';

const IntakeCheckbox: FC = () => (
  <Input name="privacy" type="checkbox" className="intake-checkbox">
    <p className="intake-privacy">
      I accept the{' '}
      <a
        className="intake-privacy-link"
        href="https://www.divorcepath.com/terms"
        target="_blank"
        rel="noreferrer"
      >
        Terms & Conditions
      </a>{' '}
      and{' '}
      <a
        className="intake-privacy-link"
        href="https://www.divorcepath.com/privacy"
        target="_blank"
        rel="noreferrer"
      >
        Privacy policy
      </a>
    </p>
  </Input>
);

export default IntakeCheckbox;
