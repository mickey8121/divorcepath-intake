import { FC, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from 'components/common/Button';

import Rating from 'components/rating/Rating';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

import professionalTypes from 'helpers/professionalTypes';
import regions from 'helpers/regions';

import { OrganizationLocation, ProfessionalPublicInfo } from 'generated/graphql';

const ProfessionalItem: FC<{ professional: ProfessionalPublicInfo }> = ({
  professional: { id, name, type, biography, rating, reviewsCount, phone, email, avatarUrl }
}) => {
  const { profile } = useProfileFromProvider();

  const { push } = useRouter();

  const croppedBio = useMemo(
    () => !!biography?.length && `${biography.slice(0, 86)}${biography.length > 86 ? '…' : ''}`,
    [biography]
  );

  const linkHref = useMemo(() => {
    const residenceKey =
      profile?.locations && (profile.locations as OrganizationLocation[])?.[0]?.residence;
    const residence = residenceKey && regions[residenceKey];

    if (!residence) return '';

    return `/family-lawyers/${residence}/professionals/${id}`.toLowerCase();
  }, [id, profile]);

  return (
    <div className="professional-item">
      <div className="professional-item-main">
        <div className="professional-avatar-container" onClick={() => void push(linkHref)}>
          {avatarUrl && (
            <Image
              alt="Professional Avatar"
              src={avatarUrl}
              width={184}
              height={184}
              placeholder="blur"
              blurDataURL={avatarUrl}
              objectFit="cover"
            />
          )}
        </div>

        <div className="professional-main-info">
          <span className="professional-name">{name}</span>
          <span className="professional-type">{professionalTypes[type]}</span>

          {!!reviewsCount && <Rating rating={rating} reviewsCount={reviewsCount} showDetails />}
        </div>

        <div className="professional-description">
          {croppedBio && <div className="professional-biography">{croppedBio}</div>}

          <Link href={linkHref}>
            <a className="btn btn-simple view-profile-link">View profile...</a>
          </Link>
        </div>
      </div>

      {(phone || email) && (
        <div className="professional-contact-btns">
          {phone && <Button type="phone" value={phone} />}
          {email && <Button type="email" value={email} className="btn-primary-accent" />}
        </div>
      )}
    </div>
  );
};

export default ProfessionalItem;
