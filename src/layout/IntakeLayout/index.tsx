import { FC } from 'react';

import Layout from 'layout/Layout';

import DivorcepathBrand from 'components/common/DivorcepathBrand';

import IntakeForm from 'components/intake/IntakeForm';
import IntakeBranding from 'components/intake/IntakeBranding';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

const Intake: FC = () => {
  const { name } = useIntakeFromProvider();

  return (
    <Layout title={`${name} - Intake form`}>
      <section className="intake">
        <IntakeBranding />
        <div className="intake-main">
          <IntakeForm />
          <DivorcepathBrand />
        </div>
      </section>
    </Layout>
  );
};

export default Intake;
