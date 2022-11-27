/* eslint-disable react/jsx-one-expression-per-line */
import { FC, Fragment } from 'react';

import { Row, Col, Button as BSButton } from 'reactstrap';
import Image from 'next/image';

import footerSections from 'utils/data/footerSections';

const copyrightStartYear = 2019;
const companyName = 'Divorcepath Corp.';
const missionStatement =
  'Our mission to simplify the divorce process. We make spousal support and child support calculators used by family law professionals and families across Canada.';

const copyrightYear = (): string | number => {
  const currentYear = new Date().getFullYear();
  return currentYear === copyrightStartYear
    ? copyrightStartYear
    : `${copyrightStartYear}-${currentYear}`;
};

const Footer: FC = () => (
  <Fragment>
    <div className="footer-cta">
      <h2>Find your path.</h2>
      <p>
        Upgrade for courtroom-ready child support & spousal support reports, plus premium calculator
        features.
      </p>
      <a href="https://www.divorcepath.com/pricing" target="_blank" rel="noreferrer">
        <BSButton className="custom-button">Upgrade Now</BSButton>
      </a>
    </div>
    <div className="footer">
      <Row className="mb-5">
        <Col md={5} lg={4}>
          <a
            className="navbar-brand mr-5 mb-2"
            href="https://www.divorcepath.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              alt="Divorcepath.com - online divorce"
              src="/intake/images/footer/divorcepath-blue.svg"
              width={239}
              height={45}
              className="placeholderImg"
            />
          </a>
          <p className="mr-4 mb-5">{missionStatement}</p>
        </Col>
        <Col md={7} lg={8}>
          <Row>
            {footerSections.map(({ links, name: sectionName }) => (
              <Col xs={6} md={6} lg={3} key={sectionName}>
                <h6>{sectionName}</h6>
                <ul>
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <a href={href} target="_blank" rel="noreferrer">
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="show-grid justify-content-between brand-year">
        <p className="pull-left">
          &copy; {copyrightYear()} {companyName}
        </p>
      </Row>
    </div>
  </Fragment>
);

export default Footer;
