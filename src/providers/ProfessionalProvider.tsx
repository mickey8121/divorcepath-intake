import { FC, createContext } from 'react';

import { ProfessionalPublicInfo } from 'generated/graphql';

export const ProfessionalContext = createContext<ProfessionalPublicInfo | null>(null);

const ProfessionalProvider: FC<{ value: ProfessionalPublicInfo | null }> = ({
  children,
  value
}) => <ProfessionalContext.Provider value={value}>{children}</ProfessionalContext.Provider>;

export default ProfessionalProvider;
