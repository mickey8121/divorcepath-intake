import { FC, memo, SVGProps } from 'react';

import classnames from 'classnames';

type StarFunc = (args: {
  halfFilled: boolean;
  filled: boolean;
  ratingValue: number;
}) => SVGProps<SVGSVGElement>;

const star: StarFunc = ({ halfFilled = false, filled = false, ratingValue }) => (
  <svg
    key={ratingValue}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className={classnames('rating-star', { filled, 'half-filled': halfFilled })}
  >
    <path d="M10 3C9.69976 3.00013 9.39951 3.17276 9.28709 3.51786L8.14828 7.02202C8.09923 7.17245 8.00385 7.3035 7.87578 7.39642C7.74771 7.48934 7.59353 7.53936 7.43531 7.53932H3.75122C3.0255 7.53932 2.72261 8.46896 3.31039 8.8963L6.29124 11.0615C6.41929 11.1546 6.51458 11.2858 6.56347 11.4363C6.61236 11.5869 6.61233 11.7491 6.56339 11.8996L5.42533 15.4038C5.20041 16.0943 5.99136 16.6693 6.57838 16.242L9.55924 14.0768C9.68734 13.9837 9.84163 13.9335 10 13.9335V3Z" />
    <path d="M10 3C10.3002 3.00013 10.6005 3.17276 10.7129 3.51786L11.8517 7.02202C11.9008 7.17245 11.9962 7.3035 12.1242 7.39642C12.2523 7.48934 12.4065 7.53936 12.5647 7.53932H16.2488C16.9745 7.53932 17.2774 8.46896 16.6896 8.8963L13.7088 11.0615C13.5807 11.1546 13.4854 11.2858 13.4365 11.4363C13.3876 11.5869 13.3877 11.7491 13.4366 11.8996L14.5747 15.4038C14.7996 16.0943 14.0086 16.6693 13.4216 16.242L10.4408 14.0768C10.3127 13.9837 10.1584 13.9335 10 13.9335V3Z" />
  </svg>
);

const RatingStars: FC<{ value: number }> = ({ value }) => {
  const stars = [1, 2, 3, 4, 5].map(ratingValue => {
    const args = {
      filled: false,
      halfFilled: false
    };

    if (value >= ratingValue - 0.25) args.filled = true;
    else if (value >= ratingValue - 0.75) args.halfFilled = true;

    return star({ ...args, ratingValue });
  });

  return <div className="rating-stars">{stars}</div>;
};

export default memo(RatingStars);
