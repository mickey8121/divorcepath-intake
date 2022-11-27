import { FC, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Col } from 'reactstrap';
import uniqBy from 'lodash/uniqBy';
import ReactShowMoreText from 'react-show-more-text';

import Button from 'components/common/Button';
import Breadcrumbs from 'components/common/Breadcrumbs';

import ContactsList from 'components/ProfilePage/ProfileSidebar/ContactsList';
import ProfileRating from 'components/rating/ProfileRating';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

import regions from 'helpers/regions';
import professionalTypes from 'helpers/professionalTypes';
import organizationTypes from 'helpers/organizationTypes';

import formatPhone from 'utils/formatPhone';

import { OrganizationLocation, OrganizationType, ProfessionalType } from 'generated/graphql';

const ProfileSidebar: FC = () => {
  const { profile, isProfessional } = useProfileFromProvider();

  const {
    name,
    description,
    type,
    phone,
    email,
    webUrl,
    url,
    logo,
    avatarUrl,
    medias,
    degree,
    organization
  } = profile || {};

  const residences = useMemo(() => {
    const locations = profile && (profile.locations as (OrganizationLocation | undefined)[]);

    return (
      locations &&
      uniqBy(
        locations.reduce((acc, location) => {
          if (location) {
            const { residence, city } = location;

            if (residence && city) {
              acc.push({
                label: `${city}, ${regions[residence]}`,
                link: `/family-lawyers/${regions[residence]}/${city}`.toLowerCase()
              });
            }
          }

          return acc;
        }, [] as Array<{ label: string; link: string }>),
        'link'
      )
    );
  }, [profile]);

  const formattedPhone = useMemo(() => !!phone?.length && formatPhone(phone), [phone]);

  const contacts = useMemo(() => {
    const list = [];
    const urlValue = url || webUrl;

    if (formattedPhone) list.push({ name: phone as string, type: 'phone', url: `tel:${phone}` });
    if (email?.length) list.push({ name: email, type: 'email', url: `mailto:${email}` });
    if (urlValue?.length) list.push({ name: urlValue, type: 'web', url: urlValue });

    return list;
  }, [email, formattedPhone, phone, url, webUrl]);

  const currentAvatarUrl = useMemo(() => logo || avatarUrl, [logo, avatarUrl]);

  if (!profile) return null;

  return (
    <Col className="sidebar-profile">
      <Breadcrumbs />

      <div className="sidebar-profile-main-info">
        <div className="mb-4 sidebar-profile-avatar-container">
          {currentAvatarUrl && (
            <Image
              alt="Profile Avatar"
              src={currentAvatarUrl}
              width={195}
              height={195}
              placeholder="blur"
              blurDataURL={currentAvatarUrl}
              objectFit="cover"
            />
          )}
        </div>

        <h4 className="p-0 mb-2 professional-name">{name}</h4>

        {type && (
          <h6 className="type-of-professional">
            {isProfessional
              ? professionalTypes[type as ProfessionalType]
              : organizationTypes[type as OrganizationType]}
          </h6>
        )}

        {!!residences?.length && (
          <div className="locations-list">
            {residences.map(({ label, link }) => (
              <Link key={link} href={link}>
                {label}
              </Link>
            ))}
          </div>
        )}

        <ProfileRating />

        <div className="button-controls">
          {formattedPhone && <Button type="phone" value={phone} />}
          {email && <Button type="email" value={email} className="btn-primary-accent" />}
        </div>
      </div>

      {((isProfessional && organization) || !isProfessional) && (
        <div className="additional-info">
          <div className="additional-info-block">
            <h6 className="additional-info-title">{organization?.name || 'About'}</h6>

            <ReactShowMoreText
              className="additional-info-content"
              lines={4}
              more="Read more"
              less="Hide"
            >
              {organization?.description || description}
            </ReactShowMoreText>
          </div>

          {!!contacts.length && (
            <div className="additional-info-block">
              <h6 className="additional-info-title">Contacts</h6>

              <ContactsList contacts={contacts} />
            </div>
          )}

          {!!medias?.length && (
            <div className="additional-info-block">
              <h6 className="additional-info-title">Social media</h6>

              <ContactsList contacts={medias} />
            </div>
          )}

          {isProfessional && !!degree?.length && (
            <div className="additional-info-block">
              <h6 className="additional-info-title">Degrees & Qualifications</h6>

              <div className="degree-list">
                {degree.map(({ id, degree: degreeItem, institution, year }) => (
                  <span key={id}>
                    {degreeItem}, {institution} ({year})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Col>
  );
};

export default ProfileSidebar;
