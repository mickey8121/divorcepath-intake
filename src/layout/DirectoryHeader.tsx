import { FC, Fragment, useMemo } from 'react';

import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import { encodeValueForLink } from 'utils/prepareLinkValue';

const DirectoryHeader: FC = () => {
  const { city, province } = useAllProvinces();

  const breadcrumb = useMemo(() => {
    const initialLinks = [];

    if (province?.name) {
      initialLinks.push({
        name: province.name,
        link: `/family-lawyers/${encodeValueForLink(province.name)}`
      });

      if (city?.name) {
        initialLinks.push({
          name: city.name,
          link: `/family-lawyers/${encodeValueForLink(province.name)}/${encodeValueForLink(
            city.name
          )}`
        });
      }
    }

    return initialLinks;
  }, [province, city]);

  return (
    <Container className="directory-header-container">
      <Row>
        <Col lg={{ size: 7, offset: 2 }}>
          <div className="directory-header">
            <div className="header-title">
              <h2 className="title">{city?.name || province?.name} Family Lawyers</h2>
              <div className="subtitle-breadcrumb">
                {breadcrumb.map(({ name, link }, index) => (
                  <Fragment key={name}>
                    <Link href={link}>{name}</Link>
                    {index + 1 !== breadcrumb.length && <span> / </span>}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DirectoryHeader;
