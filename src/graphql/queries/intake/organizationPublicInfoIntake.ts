import { gql } from '@apollo/client';

const ORGANIZATION_PUBLIC_INFO_INTAKE = gql`
  query organizationPublicInfoIntake($where: OrganizationPublicInfoWhereInput!)
  @api(name: default) {
    organizationPublicInfo(where: $where) {
      name
      description
      primaryColor
      backgroundColor
      logo
      intakeSubmittedTitle
      intakeSubmittedMessage
      intakeFormHeader
      intakeFormFooter
      intakeFormLogo
      url
      email
      phone
      issues {
        id
        name
        description
      }
    }
  }
`;

export default ORGANIZATION_PUBLIC_INFO_INTAKE;
