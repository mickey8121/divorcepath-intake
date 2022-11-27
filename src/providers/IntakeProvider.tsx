import { FC, createContext } from 'react';

import { Maybe, OrganizationIssue } from 'generated/graphql';

export interface OrganizationPublicInfo {
  backgroundColor: Maybe<string>;
  description: Maybe<string>;
  intakeSubmittedMessage?: Maybe<string>;
  intakeSubmittedTitle?: Maybe<string>;
  logo?: Maybe<string>;
  name: Maybe<string>;
  primaryColor: Maybe<string>;
  url?: Maybe<string>;
  intakeFormHeader?: string;
  intakeFormFooter?: string;
  intakeFormLogo?: string;
  issues: OrganizationIssue[];
  phone?: string;
  email?: string;
}

export const IntakeContext = createContext<OrganizationPublicInfo>({} as OrganizationPublicInfo);

const IntakeProvider: FC<OrganizationPublicInfo> = ({ children, ...value }) => (
  <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
);

export default IntakeProvider;
