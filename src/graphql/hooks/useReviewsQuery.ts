import { useMemo, useCallback, useState } from 'react';

import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';
import { useQuery } from '@apollo/client';

import { Maybe, PaginatedReviewsResponse, ProfessionalReview, SortOrder } from 'generated/graphql';
import PAGINATED_PROFESSIONAL_REVIEWS from 'graphql/queries/professionals/paginatedProfessionalReviews';

type LoadMore = (limit?: number) => void;

type UseReviewsQuery = (variables: {
  professionalId?: string;
  first: number;
}) => [
  reviews: Maybe<ProfessionalReview[]>,
  props: { loading: boolean; hasMore: boolean; loadMoreLoading: boolean; loadMore: LoadMore }
];

const useReviewsQuery: UseReviewsQuery = ({ professionalId, first }) => {
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const variables = useMemo(
    () => ({
      where: professionalId
        ? {
            Professional: {
              id: { equals: professionalId }
            }
          }
        : {},
      first,
      orderBy: [{ date: SortOrder.Desc }]
    }),
    [first, professionalId]
  );

  const {
    data: { paginatedProfessionalReviews } = {},
    loading,
    fetchMore
  } = useQuery(PAGINATED_PROFESSIONAL_REVIEWS, {
    variables
  });

  const { hasNextPage, nodes = null } =
    (paginatedProfessionalReviews as PaginatedReviewsResponse) || {};

  const loadMore = useCallback<LoadMore>(
    async limit => {
      setLoadMoreLoading(true);

      try {
        await fetchMore({
          variables: {
            ...variables,
            first: limit || first,
            after: { id: last(nodes as Maybe<ProfessionalReview>[])?.id }
          },
          updateQuery: (
            prev: any,
            {
              fetchMoreResult
            }: { fetchMoreResult?: { paginatedProfessionalReviews?: PaginatedReviewsResponse } }
          ) => {
            if (!fetchMoreResult) return prev;

            const { paginatedProfessionalReviews: { nodes: newNodes = [], ...newData } = {} } =
              fetchMoreResult;

            return {
              ...prev,
              paginatedProfessionalReviews: {
                ...prev.paginatedProfessionalReviews,
                ...newData,
                nodes: uniqBy(
                  [...(prev.paginatedProfessionalReviews.nodes || []), ...newNodes],
                  'id'
                )
              }
            };
          }
        });
      } catch (error) {}

      setLoadMoreLoading(false);
    },
    [fetchMore, first, nodes, variables]
  );

  return [
    nodes as Maybe<ProfessionalReview[]>,
    { loading, hasMore: hasNextPage, loadMoreLoading, loadMore }
  ];
};

export default useReviewsQuery;
