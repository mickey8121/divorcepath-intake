import { FC, useMemo } from 'react';

import formatPhone from 'utils/formatPhone';

import { OrganizationLocation } from 'generated/graphql';

const key = 'AIzaSyDwVMBWWk2V9OIBZ0RhFKYrUY95Lm3SoAw';

const LocationCard: FC<{ location?: OrganizationLocation | null }> = ({ location }) => {
  const [uiAddress, queryAddress] = useMemo(() => {
    if (!location) return [null, null];

    const addressArray = [];
    const { street1, street2, city } = location;

    if (street1) addressArray.push(street1);
    if (street2) addressArray.push(street2);
    if (city) addressArray.push(city);

    addressArray.push('Canada');

    return [addressArray.join(', '), addressArray.join(',').replace(/\s/g, '+')];
  }, [location]);

  const formattedPhone = useMemo(() => formatPhone(location?.phone || ''), [location]);

  if (!location || !uiAddress || !queryAddress) return null;

  const mapLink = `https://www.google.com/maps/embed/v1/place?key=${key}&q=${queryAddress}`;
  const gmLink = `https://www.google.com/maps/dir//${queryAddress}`;

  return (
    <div className="location-card">
      <div className="map-image">
        <iframe title={uiAddress} src={mapLink} />
      </div>

      <div className="description">
        <span className="address">{uiAddress}</span>

        <div className="links">
          {formattedPhone?.length && <span className="phone">{formattedPhone}</span>}

          <a href={gmLink} target="_blank" rel="noreferrer">
            Get directions in google
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
