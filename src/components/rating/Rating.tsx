import { FC } from 'react';

import RatingStars from 'components/rating/RatingStars';

const Rating: FC<{ rating: number; reviewsCount?: number; showDetails?: boolean }> = ({
  rating,
  reviewsCount,
  showDetails
}) => {
  const fixedRating = Number(rating.toFixed(1));

  return (
    <div className="rating">
      <RatingStars value={rating} />

      {showDetails && !!reviewsCount && (
        <div className="rating-details">
          <span>{fixedRating}</span> <span>({reviewsCount})</span>
        </div>
      )}
    </div>
  );
};

export default Rating;
