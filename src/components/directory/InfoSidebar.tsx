import { FC, useCallback, useMemo } from 'react';

import { Col } from 'reactstrap';
import { Link } from 'react-scroll';

import Icon from 'components/common/Icon';

import useAllProvinces from 'hooks/interview/useAllProvinces';

const InfoSidebar: FC = () => {
  const { city, province } = useAllProvinces();

  const currentPlace = useMemo(() => {
    if (city?.article) return city;
    if (province?.article) return province;

    return { name: province?.name };
  }, [city, province]);

  const Guide = useCallback(() => {
    if (!currentPlace.article) return null;

    if (currentPlace.article.bodyRaw && !currentPlace.article.resources?.length) {
      return (
        <p>
          Read our guide to{' '}
          <Link to="article" offset={-10} hashSpy name="article">
            {currentPlace?.name} family law
          </Link>{' '}
          to help find your path.
        </p>
      );
    }

    if (!currentPlace.article.bodyRaw && currentPlace.article.resources?.length) {
      return (
        <p>
          Read our collection of{' '}
          <Link to="resources" offset={-10} hashSpy name="resources">
            {currentPlace?.name} legal resources
          </Link>{' '}
          to help find your path.
        </p>
      );
    }

    return (
      <p>
        Read our guide to{' '}
        <Link to="article" offset={-10} hashSpy name="article">
          {currentPlace?.name} family law
        </Link>{' '}
        and our collection of{' '}
        <Link to="resources" offset={-10} hashSpy name="resources">
          {currentPlace?.name} legal resources
        </Link>{' '}
        to help find your path.
      </p>
    );
  }, [currentPlace]);

  return (
    <Col lg={3} md={4} className="info-sidebar">
      <div className="help-card help-navigation">
        <p>
          Get help navigating the divorce process and family law court system in{' '}
          {currentPlace?.name}. Start working with an experienced {currentPlace?.name} family lawyer
          with the right skills.
        </p>
        <p>
          We've found some of the top {currentPlace?.name} lawyers and law firms based on
          experience, cost-effectiveness and client reviews.
        </p>
        <Guide />
      </div>
      <div className="help-card">
        <div className="title">
          <Icon name="calculator" />
          <h4>Calculate Support</h4>
        </div>
        <p>
          Free child support and spousal support calculations with the Divorcepath calculator.
          Negotiate support or prepare for court.
        </p>
      </div>
      <div className="help-card">
        <div className="title">
          <Icon name="lightning" />
          <h4>Pro Tools</h4>
        </div>
        <p>
          Divorcepath creates advanced software tools for family lawyers, mediators and other
          professionals. Upgrade your practice today - free trials available.
        </p>
      </div>
      <div className="help-card">
        <div className="title">
          <Icon name="earth" />
          <h4>Promote your Firm</h4>
        </div>
        <p>
          More than 200,000 family law clients visit Divorcepath.com per year. Feature your practice
          by joining the Divorcepath network.
        </p>
      </div>
    </Col>
  );
};

export default InfoSidebar;
