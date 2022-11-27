import { FC } from 'react';

import Rating from 'components/rating/Rating';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

const ProfileRating: FC = () => {
  const { profile } = useProfileFromProvider();

  if (!profile) return null;

  const rating = Number((profile.rating || 0).toFixed(1));

  return <Rating rating={rating} reviewsCount={profile.reviewsCount} showDetails />;
};

export default ProfileRating;
