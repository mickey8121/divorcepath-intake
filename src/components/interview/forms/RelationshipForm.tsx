import { FC, Fragment, useMemo } from 'react';

import { useFormikContext } from 'formik';
import dayjs from 'dayjs';

import DateInput from 'components/common/form/DateInput';
import ToggleButtons from 'components/common/form/ToggleButtons';
import Input from 'components/common/form/Input';

import SectionTitle from 'components/interview/SectionTitle';

import { toggleButtons } from 'utils/defaultValues';

import { IntakeInterview, Relationship } from 'generated/graphql';

const separatedButtons = [
  {
    value: true,
    label: 'Married'
  },
  {
    value: false,
    label: 'Common Law'
  }
];

const marriedButtons = [
  {
    value: true,
    label: 'Separated'
  },
  {
    value: false,
    label: 'Cohabiting'
  }
];

const RelationshipForm: FC = () => {
  const { values } = useFormikContext<IntakeInterview>();

  const { cohabitationDate, separationDate, isMarried, isSeparated, isDivorced } = useMemo(
    () => (values?.relationship || {}) as Relationship,
    [values]
  );

  const subtitle = useMemo(() => {
    const cohabitationDateString = dayjs(cohabitationDate as string).format('YYYY-MM-DD');
    const separationDateString = dayjs(separationDate as string).format('YYYY-MM-DD');

    return `${cohabitationDateString.includes('Invalid Date') ? '-' : cohabitationDateString} to ${
      separationDateString === 'Invalid Date' ? '-' : separationDateString
    }`;
  }, [cohabitationDate, separationDate]);

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <SectionTitle
          src="/intake/images/interview/relationship.png"
          title="Relationship"
          subtitle={subtitle}
        />
      </div>

      <div className="body-right-side">
        <DateInput
          maxDate={dayjs((separationDate as string) || new Date()).toDate()}
          name="relationship.cohabitationDate"
          label="Date of Cohabitation"
        >
          <span className="input-hint">
            Enter the date the parties began cohabiting (may be the same or different from marriage
            date).
          </span>
        </DateInput>

        <ToggleButtons
          name="relationship.isMarried"
          label="Legally Married?"
          buttons={separatedButtons}
        />

        {isMarried && (
          <Fragment>
            <DateInput
              maxDate={new Date()}
              name="relationship.marriageDate"
              label="Date of Marriage"
            >
              <span className="input-hint">Enter the date the date of marriage</span>
            </DateInput>
            <Input name="marriagePlace" label="Place of Marriage">
              <span className="input-hint">
                Enter the city, province/state and country in which you were married.
              </span>
            </Input>
          </Fragment>
        )}

        <ToggleButtons
          name="relationship.isSeparated"
          label="Separated?"
          buttons={marriedButtons}
        />

        {isSeparated && (
          <DateInput
            minDate={dayjs((cohabitationDate as string) || new Date()).toDate()}
            maxDate={new Date()}
            name="relationship.separationDate"
            label="Date of Separation"
          >
            <span className="input-hint">Enter the date the parties separated.</span>
          </DateInput>
        )}

        <ToggleButtons name="relationship.isDivorced" label="Divorced?" buttons={toggleButtons}>
          <span className="input-hint">Has a divorce been granted?</span>
        </ToggleButtons>

        {isDivorced && (
          <DateInput maxDate={new Date()} name="relationship.divorceDate" label="Date of Divorce">
            <span className="input-hint">Date of divorce judgment</span>
          </DateInput>
        )}

        <div className="hint">
          The length of the relationship can impact the duration and amount of spousal support.
        </div>
      </div>
    </div>
  );
};

export default RelationshipForm;
