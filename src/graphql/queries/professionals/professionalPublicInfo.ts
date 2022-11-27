import { gql } from '@apollo/client';

import PROFESSIONAL_PUBLIC_INFO_FRAGMENT from 'graphql/fragments/professionalPublicInfo';

const PROFESSIONAL_PUBLIC_INFO = gql`
  ${PROFESSIONAL_PUBLIC_INFO_FRAGMENT}

  query ProfessionalPublicInfo($where: ProfessionalPublicInfoWhereInput!) @api(name: default) {
    professionalPublicInfo(where: $where) {
      ...PROFESSIONAL_PUBLIC_INFO_FRAGMENT

      organization {
        formUrn
        name
        description
      }
    }
  }
`;

export default PROFESSIONAL_PUBLIC_INFO;
