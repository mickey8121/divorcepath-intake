import { FC, Fragment } from 'react';

import { Button } from 'reactstrap';

import Loading from 'components/common/Loading';

import ReviewsListItem from 'components/ProfilePage/Reviews/ReviewsListItem';

import useProfileFromProvider from 'hooks/useProfileFromProvider';
import useReviewsQuery from 'graphql/hooks/useReviewsQuery';

const ReviewsList: FC = () => {
  const { profile } = useProfileFromProvider();

  const [reviews, { loading, hasMore, loadMoreLoading, loadMore }] = useReviewsQuery({
    professionalId: profile?.id,
    first: 3
  });

  if (!reviews?.length) {
    if (loading) return <Loading />;

    return null;
  }

  return (
    <Fragment>
      <div className="reviews-container">
        <div className="reviews-list">
          {reviews.map(review => (
            <ReviewsListItem key={review.id} review={review} />
          ))}

          {loadMoreLoading && <Loading />}
        </div>

        {hasMore && !loadMoreLoading && (
          <Button className="btn btn-simple" onClick={() => loadMore(10)}>
            See more...
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default ReviewsList;
