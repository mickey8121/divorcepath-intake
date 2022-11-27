import { FC, useCallback, useMemo, useState } from 'react';

import classNames from 'classnames';
import ReactShowMoreText from 'react-show-more-text';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ImageWithErrorHandler from 'components/common/ImageWithErrorHandler';

import Rating from 'components/rating/Rating';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import useWindowSize from 'utils/useWindowSize';
import professionalTypes from 'utils/data/professionalTypes';
import orgTypes from 'utils/data/organizationTypes';

import {
  DirectoryPageEntity,
  DirectoryPageOrganizationCard,
  DirectoryPageProfessionalCard,
  Maybe
} from 'generated/graphql';

interface Props {
  entity?: Maybe<DirectoryPageEntity>;
}

const ProfessionalItem: FC<Props> = ({ entity }) => {
  const { width } = useWindowSize();

  const { push } = useRouter();

  const [isImageError, setIsImageError] = useState(false);

  const { id, name, locations, description, rating, image, reviewsCount } = entity || {};
  const { formUrn } = (entity || {}) as DirectoryPageOrganizationCard;

  const { province, city: currentCity } = useAllProvinces();

  const { residence, city } = useMemo(() => {
    const locationByCity = locations?.find(l => l?.city === currentCity?.name);

    if (locationByCity) return { residence: province?.name, city: locationByCity?.city };

    return {
      residence: province?.name,
      city: locations?.find(l => l?.residence === province?.shorthand)?.city
    };
  }, [locations, province?.shorthand, currentCity?.name, province?.name]);

  const orgType = useMemo(() => {
    const type = (entity as DirectoryPageOrganizationCard)?.orgType;

    return orgTypes.find(organizationType => organizationType.value === type)?.name || type;
  }, [entity]);

  const proType = useMemo(() => {
    const type = (entity as DirectoryPageProfessionalCard)?.type;

    return (
      professionalTypes.find(professionalType => professionalType.value === type)?.name || type
    );
  }, [entity]);

  const organization = useMemo(
    () => (entity as DirectoryPageProfessionalCard).organization,
    [entity]
  );

  const textWidth = useMemo(() => {
    if (width) {
      if (width < 576) return width - 30;
      if (width < 768) return 500;
      if (width < 993) return 275;
      if (width < 1200) return 330;
    }

    return 367;
  }, [width]);

  const handleImageError = useCallback(() => setIsImageError(prev => !prev), []);

  const avatarClassName = useMemo(
    () => classNames('professional-avatar', { 'no-image': isImageError || !image }),
    [isImageError, image]
  );

  const getLinkHref = useCallback(
    (entityType: 'organizations' | 'professionals') => {
      const entityId = entityType === 'organizations' ? formUrn || organization?.formUrn : id;

      if (!residence || !entityId) return '';

      return `/family-lawyers/${residence}/${entityType}/${entityId}`.toLowerCase();
    },
    [formUrn, organization, id, residence]
  );

  return (
    <div className="professional-item">
      <div className="professional-item-content">
        <div
          className={avatarClassName}
          onClick={() => void push(getLinkHref(formUrn ? 'organizations' : 'professionals'))}
        >
          <ImageWithErrorHandler src={image as string} onError={handleImageError} />
        </div>
        <div className="professional-info">
          <Link href={getLinkHref(formUrn ? 'organizations' : 'professionals')}>
            <a className="name">{name}</a>
          </Link>
          <div className="short-info">
            {(orgType || proType) && <span>{proType || orgType}</span>}

            {(city || residence) && (
              <span>
                {residence || ''}
                {residence && city ? `, ${city || ''}` : city || ''}
              </span>
            )}

            {organization?.formUrn && organization?.name && (
              <Link href={getLinkHref('organizations')}>{organization.name}</Link>
            )}
          </div>

          <Rating rating={rating || 0} reviewsCount={reviewsCount} showDetails />

          {description && (
            <ReactShowMoreText
              lines={3}
              anchorClass="show-more-text"
              width={textWidth}
              className="biography"
            >
              <span className="biography">{description}</span>
            </ReactShowMoreText>
          )}
        </div>
      </div>
      {description && (
        <ReactShowMoreText
          lines={3}
          more="Read full review"
          anchorClass="show-more-text"
          width={textWidth}
          className="biography"
        >
          {description}
        </ReactShowMoreText>
      )}
    </div>
  );
};

export default ProfessionalItem;
