/* eslint-disable camelcase */
import { FC, memo, useMemo } from 'react';

import { useRouter } from 'next/router';

import { AllProvincesContext } from 'hooks/interview/useAllProvinces';

import { decodeValueFromLink } from 'utils/prepareLinkValue';

import { Maybe } from 'generated/graphql';
import { Sanity_Province } from 'generated/sanity_graphql';

interface Props {
  value?: Maybe<Sanity_Province[]>;
}

const AllProvincesProvider: FC<Props> = ({ children, value }) => {
  const router = useRouter();

  const { province, city } = useMemo(() => router.query, [router]);

  const currentCity = useMemo(() => {
    const cities = value?.find(
      place => place.name?.toLowerCase() === decodeValueFromLink(province as string)?.toLowerCase()
    )?.cities;

    return cities?.find(
      cityItem =>
        (cityItem?.name as string)?.toLowerCase() ===
        decodeValueFromLink(city as string)?.toLowerCase()
    );
  }, [value, province, city]);

  const currentProvince = useMemo(
    () =>
      value?.find(
        p =>
          (p.name as string)?.toLowerCase() ===
          decodeValueFromLink(province as string)?.toLowerCase()
      ),
    [value, province]
  );

  return (
    <AllProvincesContext.Provider
      value={{ allProvinces: value, province: currentProvince, city: currentCity }}
    >
      {children}
    </AllProvincesContext.Provider>
  );
};

export default memo<FC<Props>>(AllProvincesProvider);
