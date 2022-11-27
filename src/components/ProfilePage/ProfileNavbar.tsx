import { FC, useCallback, useMemo } from 'react';

import { Button, ButtonGroup } from 'reactstrap';
import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';

import Icon, { IconName } from 'components/common/Icon';

import useProfileFromProvider from 'hooks/useProfileFromProvider';

import { OrganizationLocation } from 'generated/graphql';

const ProfileNavbar: FC = () => {
  const { profile, isProfessional } = useProfileFromProvider();

  const navItems = useMemo(() => {
    if (!profile) return null;

    const items = [];

    if (isProfessional) {
      if (profile.biography) items.push({ id: 'bio', icon: 'user' });
      if (profile.name && profile.email) items.push({ id: 'contact', icon: 'phone' });
      if (typeof profile.rating === 'number') items.push({ id: 'reviews', icon: 'star' });
    }

    if ((profile.locations as OrganizationLocation[])?.length)
      items.push({ id: 'offices', icon: 'home' });

    if (!isProfessional && profile.professionals?.length)
      items.push({ id: 'professionals', icon: 'user' });

    return items as { id: string; icon: IconName }[];
  }, [profile, isProfessional]);

  const onClick = useCallback((id: string): void => {
    const element = document.getElementById(id);

    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!navItems?.length) return null;

  return (
    <div className="profile-navbar-container">
      <ButtonGroup className="button-controls profile-navbar">
        {navItems.map(({ icon, id }) => (
          <Button
            size="sm"
            key={id}
            className={classNames('profile-navbar-btn', `icon-${id}`)}
            onClick={() => onClick(id)}
          >
            <Icon name={icon} />
            {upperFirst(id)}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ProfileNavbar;
