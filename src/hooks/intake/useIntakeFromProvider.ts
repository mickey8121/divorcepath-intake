import { useContext } from 'react';

import { IntakeContext, OrganizationPublicInfo } from 'providers/IntakeProvider';

const useIntakeFromProvider = (): OrganizationPublicInfo => useContext(IntakeContext);

export default useIntakeFromProvider;
