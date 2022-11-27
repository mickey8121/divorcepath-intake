import { FC, useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import Select from 'components/common/Select';

import useAllProvinces from 'hooks/interview/useAllProvinces';

import { encodeValueForLink } from 'utils/prepareLinkValue';

const Search: FC = () => {
  const { allProvinces } = useAllProvinces();

  const { push } = useRouter();

  const groupedOptions = useMemo(
    () => [
      {
        label: 'Provinces',
        options: allProvinces?.map(({ name }) => ({
          label: name,
          value: `/family-lawyers/${encodeValueForLink(name as string)}`
        }))
      },
      ...(allProvinces?.map(p => ({
        label: p?.name,
        options: p.cities?.map(c => ({
          label: c?.name,
          value: `/family-lawyers/${encodeValueForLink(p?.name as string)}/${encodeValueForLink(
            c?.name as string
          )}`
        }))
      })) || [])
    ],
    [allProvinces]
  );

  const handleChange = useCallback(
    option => {
      void push(option.value as string);
    },
    [push]
  );

  return (
    <div className="search-container">
      <div className="select form-group">
        <Select
          icon="search"
          onChange={handleChange}
          placeholder="Search by city, name or province"
          options={groupedOptions}
          classNamePrefix="custom-select"
        />
      </div>
    </div>
  );
};

export default Search;
