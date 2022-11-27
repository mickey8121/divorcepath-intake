import { FC, useMemo } from 'react';

import Image from 'next/image';

import Layout from 'layout/Layout';

import DivorcepathBrand from 'components/common/DivorcepathBrand';

interface Props {
  isInterview?: boolean;
}

const NotFoundPage: FC<Props> = ({ isInterview }) => {
  const linkText = useMemo(
    () =>
      isInterview
        ? '.../intake/interview/[organization-name]/[token]'
        : '.../intake/[organization-name]',
    [isInterview]
  );

  return (
    <Layout title="Not found">
      <section className="not-found">
        <div className="not-found-container">
          <div className="not-found-image">
            <Image
              src="/intake/images/icons/404.svg"
              layout="responsive"
              width={406}
              height={306}
              alt="Page not found"
            />
          </div>
          <p className="not-found-text">
            Please enter the name of the registered organization in the address bar in the format
            <span className="not-found-span"> {linkText} </span>
            where enter the name of the organization without brackets.
          </p>
        </div>
        <DivorcepathBrand />
      </section>
    </Layout>
  );
};

NotFoundPage.defaultProps = {
  isInterview: false
};

export default NotFoundPage;
