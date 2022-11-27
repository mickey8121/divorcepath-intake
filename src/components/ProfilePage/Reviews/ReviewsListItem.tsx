import { FC, useMemo } from 'react';

import startCase from 'lodash/startCase';

import Rating from 'components/rating/Rating';

import formatDate from 'utils/formatDate';

import { ProfessionalReview } from 'generated/graphql';

const ReviewListItem: FC<{ review: ProfessionalReview }> = ({ review }) => {
  const { id, date, reviewerName, content, rating, sourceName, sourceUrl } = review;

  const validSourceUrl = useMemo(() => {
    if (!sourceUrl) return null;
    if (sourceUrl.match(/^(https:\/\/|http:\/\/)/)) return sourceUrl;

    return `http://${sourceUrl}`;
  }, [sourceUrl]);

  return (
    <div key={id} className="review-item">
      <div className="review-main-info">
        <h6>{reviewerName}</h6>
        <Rating rating={rating} />
      </div>

      <div className="review-add-info">
        <p className="text-muted">{formatDate(date as Date)}</p>

        {sourceName &&
          (validSourceUrl ? (
            <a
              className="review-source-link"
              href={validSourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              From {startCase(sourceName)}
            </a>
          ) : (
            <p className="text-muted">From {startCase(sourceName)}</p>
          ))}
      </div>

      <p className="review-description">{content}</p>
    </div>
  );
};

export default ReviewListItem;
