import { FC } from 'react';

import { Row } from 'reactstrap';

import ProfileProvider, { ProfilePublicInfo } from 'providers/ProfileProvider';

import ProfileSidebar from 'components/ProfilePage/ProfileSidebar/ProfileSidebar';
import ProfileContent from 'components/ProfilePage/ProfileContent';

import { Maybe, OrganizationPublicInfoResponse, ProfessionalPublicInfo } from 'generated/graphql';

interface Props {
  organization?: Maybe<OrganizationPublicInfoResponse>;
  professional?: Maybe<ProfessionalPublicInfo>;
}

const Profile: FC<Props> = ({ organization, professional }) => (
  <ProfileProvider value={(organization || professional) as ProfilePublicInfo}>
    <div className="profile-page-container">
      <Row className="profile-page container">
        <ProfileSidebar />
        <ProfileContent />
      </Row>
    </div>
  </ProfileProvider>
);

export default Profile;
