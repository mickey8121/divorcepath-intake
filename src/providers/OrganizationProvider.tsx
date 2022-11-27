import { FC, createContext } from 'react';

import { OrganizationPublicInfoResponse } from 'generated/graphql';

export const OrganizationContext = createContext<OrganizationPublicInfoResponse | null>(null);

const OrganizationProvider: FC<{ value: OrganizationPublicInfoResponse | null }> = ({
  children,
  value
}) => <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;

export default OrganizationProvider;
