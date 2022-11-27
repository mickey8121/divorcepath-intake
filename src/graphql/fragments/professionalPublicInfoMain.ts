import { gql } from '@apollo/client';

const PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT = gql`
  fragment PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT on ProfessionalPublicInfo {
    id
    name
    type
    biography
    webUrl
    email
    phone
    rating
    reviewsCount
    avatarUrl
  }
`;

export default PROFESSIONAL_PUBLIC_INFO_MAIN_FRAGMENT;
