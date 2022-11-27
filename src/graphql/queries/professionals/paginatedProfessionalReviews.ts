import gql from 'graphql-tag';
import PROFESSIONAL_REVIEW_FRAGMENT from 'graphql/fragments/professionalReview';

const PAGINATED_PROFESSIONAL_REVIEWS = gql`
  ${PROFESSIONAL_REVIEW_FRAGMENT}

  query PaginatedProfessionalReviews(
    $where: ProfessionalReviewWhereInput
    $orderBy: [ProfessionalReviewOrderByInput]
    $after: ProfessionalReviewWhereUniqueInput
    $first: Int
  ) @api(name: default) {
    paginatedProfessionalReviews(where: $where, orderBy: $orderBy, after: $after, first: $first) {
      count
      hasNextPage
      nodes {
        ...PROFESSIONAL_REVIEW_FRAGMENT
      }
    }
  }
`;

export default PAGINATED_PROFESSIONAL_REVIEWS;
