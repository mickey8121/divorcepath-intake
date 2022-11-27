import { useMemo, FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Layout from 'layout/Layout';

import Button from 'components/common/Button';
import DivorcepathBrand from 'components/common/DivorcepathBrand';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

const IntakeLayoutThankYou: FC = () => {
  const { intakeSubmittedTitle, intakeSubmittedMessage, url, name } = useIntakeFromProvider();

  const title = useMemo(
    () => intakeSubmittedTitle || 'Thank you for contacting us!',
    [intakeSubmittedTitle]
  );

  const description = useMemo(
    () =>
      intakeSubmittedMessage || 'Your information has been sent. You will be contacted shortly.',
    [intakeSubmittedMessage]
  );

  return (
    <Layout title={`${name} - We’ll be in touch`}>
      <section className="intake intake-thanks">
        <div className="intake-thanks-container">
          <div className="intake-thanks-image">
            <Image
              src="/intake/images/icons/team-success.svg"
              width={297}
              height={224}
              alt="People rapturously demonstrate success"
              layout="responsive"
            />
          </div>

          <div className="intake-thanks-main">
            <h1 className="intake-thanks-title">{title}</h1>
            <p className="intake-thanks-description">{description}</p>

            <Link
              href={url || process.env.NEXT_PUBLIC_MAIN_PAGE_LINK || 'https://www.divorcepath.com/'}
              passHref
            >
              <Button>Back to organization</Button>
            </Link>
          </div>
        </div>

        <DivorcepathBrand />
      </section>
    </Layout>
  );
};

export default IntakeLayoutThankYou;
