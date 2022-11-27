import { FC, Fragment } from 'react';

import { Col } from 'reactstrap';
import ReactShowMoreText from 'react-show-more-text';

import ProfileNavbar from 'components/ProfilePage/ProfileNavbar';
import LocationCard from 'components/ProfilePage/LocationCard';
import ContactPopup from 'components/ProfilePage/ContactPopup';
import ProfessionalItem from 'components/ProfilePage/ProfessionalItem';
import ReviewsList from 'components/ProfilePage/Reviews/ReviewsList';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

import { OrganizationLocation } from 'generated/graphql';

const ProfileContent: FC = () => {
  const { profile, isProfessional } = useProfileFromProvider();

  if (!profile) return null;

  const { biography, locations, name, email, reviewsCount, professionals } = profile;

  return (
    <Col className="profile-content">
      <ProfileNavbar />

      {isProfessional && (
        <Fragment>
          {biography && (
            <div id="bio" className="profile-content-section">
              <h5 className="section-title">Professional Bio</h5>
              <ReactShowMoreText className="section-content" lines={4} more="Read more" less="Hide">
                {biography}
              </ReactShowMoreText>
            </div>
          )}

          {name && email && (
            <div id="contact" className="profile-content-section">
              <ContactPopup name={name} email={email} />
            </div>
          )}

          {!!reviewsCount && (
            <div id="reviews" className="profile-content-section">
              <h5>Reviews</h5>

              <ReviewsList />
            </div>
          )}
        </Fragment>
      )}

      {!!(locations as OrganizationLocation[])?.length && (
        <div id="offices" className="profile-content-section">
          <h5>Offices</h5>

          <div className="offices-list">
            {(locations as OrganizationLocation[]).map(
              loc => loc && <LocationCard key={loc.id} location={loc} />
            )}
          </div>
        </div>
      )}

      {!isProfessional && !!professionals?.length && (
        <div id="professionals" className="profile-content-section">
          <h5>Professionals</h5>

          <div className="professionals-list">
            {professionals.map(pro => pro && <ProfessionalItem key={pro.id} professional={pro} />)}
          </div>
        </div>
      )}
    </Col>
  );
};

export default ProfileContent;
