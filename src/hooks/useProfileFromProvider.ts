import { useContext } from 'react';

import { ProfileContext, ProfilePublicInfo } from 'providers/ProfileProvider';

const useProfileFromProvider = (): { isProfessional?: boolean; profile: ProfilePublicInfo } =>
  useContext(ProfileContext);

export default useProfileFromProvider;
