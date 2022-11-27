import { gql } from '@apollo/client';

import PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT from 'graphql/fragments/professionalPublicInfoMain';

const ORGANIZATION_PUBLIC_INFO = gql`
  ${PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT}

  query OrganizationPublicInfo($where: OrganizationPublicInfoWhereInput!) @api(name: default) {
    organizationPublicInfo(where: $where) {
      name
      description
      backgroundColor
      logo
      url
      email
      phone
      rating
      reviewsCount

      locations {
        id
        phone
        postal
        residence
        street1
        street2
        website
        city
        email
        fax
      }

      professionals {
        ...PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT
      }
    }
  }
`;

export default ORGANIZATION_PUBLIC_INFO;
