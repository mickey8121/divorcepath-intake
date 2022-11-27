import { FC, useMemo } from 'react';

import Link from 'next/link';
import { Col } from 'reactstrap';
import { sortBy } from 'lodash';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import { encodeValueForLink } from 'utils/prepareLinkValue';

const PlacesSidebar: FC = () => {
  const { allProvinces, province } = useAllProvinces();

  const cities = useMemo(() => sortBy(province?.cities, c => c?.name), [province]);

  const provinces = useMemo(
    () =>
      sortBy(
        allProvinces?.map(place => place.name).filter(p => p !== province?.name),
        p => p
      ),
    [allProvinces, province?.name]
  );

  return (
    <Col lg={2} md={3} className="places-sidebar">
      <div className="cities">
        <h5 className="title">{province?.name}</h5>
        <div className="links">
          {cities?.map(
            cityItem =>
              !!province?.name &&
              !!cityItem?.name && (
                <Link
                  href={`/family-lawyers/${encodeValueForLink(province.name)}/${encodeValueForLink(
                    cityItem.name
                  )}`}
                  key={cityItem.name}
                >
                  {cityItem.name}
                </Link>
              )
          )}
        </div>
      </div>
      <div className="provinces">
        <h5 className="title">Provinces</h5>
        <div className="links">
          {provinces?.map(provinceName => (
            <Link
              href={`/family-lawyers/${encodeValueForLink(provinceName as string)}`}
              key={provinceName}
            >
              {provinceName}
            </Link>
          ))}
        </div>
      </div>
    </Col>
  );
};

export default PlacesSidebar;
