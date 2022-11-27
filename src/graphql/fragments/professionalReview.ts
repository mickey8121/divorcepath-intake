import gql from 'graphql-tag';

const PROFESSIONAL_REVIEW_FRAGMENT = gql`
  fragment PROFESSIONAL_REVIEW_FRAGMENT on ProfessionalReview {
    id
    content
    rating
    reviewerName
    sourceName
    sourceUrl
    date
  }
`;

export default PROFESSIONAL_REVIEW_FRAGMENT;
