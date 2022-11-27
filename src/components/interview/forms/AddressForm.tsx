import { FC } from 'react';

import { sortBy } from 'lodash';

import SelectField from 'components/common/form/SelectField';
import Input from 'components/common/form/Input';

import SectionTitle from 'components/interview/SectionTitle';

import useShortUserInfo from 'hooks/interview/useShortUserInfo';

import { canadianProvinces, canadianTerritories } from 'utils/places';

const optionsArray = sortBy(canadianProvinces.concat(canadianTerritories), 'label');

interface Props {
  partyType: 'exAddress' | 'address';
}

const AddressForm: FC<Props> = ({ partyType }) => {
  const { avatar, title, subtitle } = useShortUserInfo(
    partyType.includes('ex') ? 'exProfile' : 'profile'
  );

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <SectionTitle src={avatar} title={title} subtitle={subtitle} />
      </div>

      <div className="body-right-side">
        <Input
          name={`${partyType}.street1`}
          placeholder="9 Bailey Drive, Fredericton, NB E3B 5A3"
          label="Street"
          hideIsShort
        />

        <Input name={`${partyType}.city`} placeholder="Ottawa" label="City" />

        <SelectField
          label="Province/Territory"
          className="calculation-select"
          name={`${partyType}.residence`}
          options={optionsArray}
          placeholder="Ontario"
        />
        <div className="inputs-row">
          <Input name={`${partyType}.country`} placeholder="Canada" label="Country" hideIsShort />
          <Input
            name={`${partyType}.postal`}
            placeholder="G2H 4I5"
            label="Postal Code"
            hideIsShort
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
