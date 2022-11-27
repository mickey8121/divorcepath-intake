import { FC } from 'react';

import { sortBy } from 'lodash';

import SelectField from 'components/common/form/SelectField';
import Input from 'components/common/form/Input';
import ToggleButtons from 'components/common/form/ToggleButtons';
import DateInput from 'components/common/form/DateInput';

import SectionTitle from 'components/interview/SectionTitle';

import useShortUserInfo from 'hooks/interview/useShortUserInfo';

import { canadianProvinces, canadianTerritories } from 'utils/places';
import { genderButtons, toggleButtons } from 'utils/defaultValues';

const optionsArray = sortBy(canadianProvinces.concat(canadianTerritories), 'label');

interface Props {
  partyType: 'profile' | 'exProfile';
}

const PersonForm: FC<Props> = ({ partyType }) => {
  const { avatar, title, subtitle } = useShortUserInfo(partyType);

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <SectionTitle src={avatar} title={title} subtitle={subtitle} />
      </div>

      <div className="body-right-side">
        <SelectField
          label="Choose a province"
          className="calculation-select"
          name={`${partyType}.residence`}
          options={optionsArray}
          placeholder="Alberta"
        >
          <span className="input-hint">
            The province or territory this person primarily resides in.
          </span>
        </SelectField>

        <Input name={`${partyType}.firstName`} placeholder="You" label="First Name">
          <span className="input-hint">Used to customize your report</span>
        </Input>

        <Input name={`${partyType}.lastName`} placeholder="You" label="Last Name">
          <span className="input-hint">Used to customize your report</span>
        </Input>

        <ToggleButtons name={`${partyType}.gender`} label="Gender" buttons={genderButtons}>
          <span className="input-hint">Used to customize your report</span>
        </ToggleButtons>

        <DateInput
          maxDate={new Date()}
          name={`${partyType}.birthDate`}
          label="Date of Birth"
          hideIsShort
        >
          <span className="input-hint">
            Age is a factor in calculating tax and spousal support.
          </span>
        </DateInput>

        <ToggleButtons
          name={`${partyType}.hasNewPartner`}
          label="New partner?"
          buttons={toggleButtons}
          hideIsShort
        >
          <span className="input-hint">
            Remarried or new common law-partner?
            <br />
            This can affect tax calculations.
          </span>
        </ToggleButtons>
      </div>
    </div>
  );
};

export default PersonForm;
