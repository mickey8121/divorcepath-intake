import { FC, useMemo } from 'react';

import BrandLogo from 'components/intake/BrandLogo';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

const IntakeBranding: FC = () => {
  const { name, description, logo, intakeFormLogo } = useIntakeFromProvider();

  const showText = useMemo(() => !logo && !intakeFormLogo, [intakeFormLogo, logo]);

  return (
    <div className="intake-branding">
      <BrandLogo />
      {showText && <h1 className="intake-brand-name">{name}</h1>}
      <h3 className="intake-brand-description">{description}</h3>
    </div>
  );
};

export default IntakeBranding;
