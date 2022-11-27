import { gql } from '@apollo/client';

import PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT from 'graphql/fragments/professionalPublicInfoMain';

const PROFESSIONAL_PUBLIC_INFO_FRAGMENT = gql`
  ${PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT}

  fragment PROFESSIONAL_PUBLIC_INFO_FRAGMENT on ProfessionalPublicInfo {
    ...PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT

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

    degree {
      id
      institution
      year
      degree
      abbreviation
      createdAt
      updatedAt
    }

    medias {
      id
      name
      type
      url
    }
  }
`;

export default PROFESSIONAL_PUBLIC_INFO_FRAGMENT;
