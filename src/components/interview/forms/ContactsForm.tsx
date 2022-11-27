import { FC, Fragment, useMemo } from 'react';

import { useFormikContext } from 'formik';

import Input from 'components/common/form/Input';
import ToggleButtons from 'components/common/form/ToggleButtons';

import SectionTitle from 'components/interview/SectionTitle';

import useShortUserInfo from 'hooks/interview/useShortUserInfo';

import { IntakeInterview } from 'generated/graphql';

const toggleButtons = [
  {
    value: true,
    label: 'Yes'
  },
  {
    value: false,
    label: 'No'
  }
];

interface Props {
  partyType: 'profile' | 'exProfile';
}

const ContactsForm: FC<Props> = ({ partyType }) => {
  const { values } = useFormikContext<IntakeInterview>();

  const { avatar, title, subtitle } = useShortUserInfo(partyType);

  const isEx = useMemo(() => partyType === 'exProfile', [partyType]);
  const isExLawyer = useMemo(() => values.exLawyer && isEx, [values.exLawyer, isEx]);

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <SectionTitle src={avatar} title={title} subtitle={subtitle} />
      </div>

      <div className="body-right-side">
        {isEx ? (
          <ToggleButtons name="exLawyer" label="Lawyer for the Ex. " buttons={toggleButtons}>
            <span className="input-hint">Does the ex have a lawyer?</span>
          </ToggleButtons>
        ) : null}

        {isExLawyer && (
          <Fragment>
            <Input name="exLawyerCompanyName" placeholder="Divorcepath" label="Law Firm Name">
              <span className="input-hint">Write the name of the law firm</span>
            </Input>

            <Input name="exLawyerName" placeholder="Josh" label="Name">
              <span className="input-hint">Write the lawyer's name.</span>
            </Input>
          </Fragment>
        )}

        {(!isExLawyer || !isEx) && (
          <Fragment>
            <Input
              name={`${partyType}.email`}
              placeholder="example@example.com"
              label={isEx ? 'Ex Email' : 'Email'}
            >
              <span className="input-hint">Write contact email.</span>
            </Input>
            <Input
              name={`${partyType}.phone`}
              placeholder="+1(234)-567-89-00"
              label={isEx ? 'Ex Phone Number' : 'Phone Number'}
            >
              <span className="input-hint">Write contact phone number.</span>
            </Input>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ContactsForm;
