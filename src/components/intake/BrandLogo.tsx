import { FC } from 'react';

import Image from 'next/image';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

const BrandLogo: FC = () => {
  const { logo, name, intakeFormLogo } = useIntakeFromProvider();

  if (!logo && !intakeFormLogo) return null;

  return (
    <div className="intake-logo">
      <Image
        src={intakeFormLogo || logo || ''}
        alt={`${name} logo`}
        width={450}
        height={200}
        layout="responsive"
        objectFit="contain"
      />
    </div>
  );
};

export default BrandLogo;
