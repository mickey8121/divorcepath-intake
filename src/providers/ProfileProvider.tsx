import { FC, createContext } from 'react';

import { DeepMergeTwoTypes } from 'utils/typescript/DeepMergeTwoTypes';

import { ProfessionalPublicInfo, OrganizationPublicInfoResponse } from 'generated/graphql';

export type ProfilePublicInfo = DeepMergeTwoTypes<
  OrganizationPublicInfoResponse,
  ProfessionalPublicInfo
> | null;

export const ProfileContext = createContext<{
  isProfessional?: boolean;
  profile: ProfilePublicInfo;
}>({ profile: null });

const ProfileProvider: FC<{ value: ProfilePublicInfo }> = ({ children, value: profile }) => (
  <ProfileContext.Provider
    // eslint-disable-next-line no-underscore-dangle
    value={{ isProfessional: profile?.__typename === 'ProfessionalPublicInfo', profile }}
  >
    {children}
  </ProfileContext.Provider>
);

export default ProfileProvider;
