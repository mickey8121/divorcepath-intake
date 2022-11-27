import { FC, Fragment, useCallback, useMemo } from 'react';

import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import ToggleButtons from 'components/common/form/ToggleButtons';
import Input from 'components/common/form/Input';
import DateInput from 'components/common/form/DateInput';
import Icon from 'components/common/Icon';

import SectionTitle from 'components/interview/SectionTitle';

import {
  genderButtons,
  parentingButtons,
  supportedByButtons,
  supportTypeButtons,
  toggleButtons
} from 'utils/defaultValues';

import { Children } from 'generated/graphql';

interface Props {
  index: number;
  child: Children;
  isLast?: boolean;
  loading?: boolean;
  onCreateChild: () => void;
  onRemoveChild: (id?: string, index?: number) => void;
}

const ChildForm: FC<Props> = ({ index, child, isLast, loading, onCreateChild, onRemoveChild }) => {
  const {
    gender,
    birthDate,
    supportType,
    firstName,
    isOfRelationship,
    isDependent,
    priorRelationship
  } = child;

  const age = useMemo(() => dayjs().diff(birthDate as string, 'years') || 0, [birthDate]);

  const title = useMemo(() => {
    if (!firstName) return `Child ${index + 1}`;

    return `${firstName || ''}`;
  }, [firstName, index]);

  const subtitle = useMemo(() => {
    let info = `Age ${age}`;

    if (gender) info = `${info} / ${gender.charAt(0)}`;

    return `${info} / ${capitalize(supportType as string)}`;
  }, [age, gender, supportType]);

  const avatar = useMemo(() => {
    if (gender) {
      if (age > 3) {
        if (age > 18) {
          if (gender === 'MALE') return `/intake/images/interview/account.png`;
          return `/intake/images/interview/user-female.png`;
        }

        if (gender === 'MALE') return `/intake/images/interview/boy.png`;
        return `/intake/images/interview/girl.png`;
      }

      return `/intake/images/interview/baby.png`;
    }

    return `/intake/images/interview/baby.png`;
  }, [gender, age]);

  const handleRemoveChild = useCallback(() => {
    onRemoveChild(child.id, index);
  }, [child.id, index, onRemoveChild]);

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <SectionTitle src={avatar} title={title} subtitle={subtitle} />
      </div>

      <div className="body-right-side">
        <Input name={`children.${index}.firstName`} placeholder="Arthur" label="First Name">
          <span className="input-hint">
            Child's first name, as it appears on their birth certificate.
          </span>
        </Input>

        <DateInput maxDate={new Date()} name={`children.${index}.birthDate`} label="Date of Birth">
          <span className="input-hint">Enter Child's date of birth.</span>
        </DateInput>

        <ToggleButtons name={`children.${index}.gender`} label="Gender" buttons={genderButtons}>
          <span className="input-hint">
            Select the gender indicated on the child's birth certificate.
          </span>
        </ToggleButtons>

        <ToggleButtons
          name={`children.${index}.isOfRelationship`}
          label="Child of Relationship?"
          buttons={toggleButtons}
          hideIsShort
        >
          <span className="input-hint">
            Is the child a "child of this relationship" or a child from a different relationship?
            This can be complicated. If you're not sure how to answer, check the help centre.
          </span>
        </ToggleButtons>

        {isOfRelationship && (
          <Fragment>
            <ToggleButtons
              name={`children.${index}.parenting`}
              buttons={parentingButtons}
              label="Parenting Arrangement"
            >
              <span className="input-hint">
                If the child lives primarily with one person, select the primary parent. Otherwise,
                select shared parenting.
              </span>
            </ToggleButtons>

            {age >= 18 && (
              <ToggleButtons
                name={`children.${index}.isDependent`}
                label="Adult Child Still a Legal Dependent?"
                buttons={toggleButtons}
                hideIsShort
              >
                <span className="input-hint">
                  This child is over the age of 18. Is this child a legal dependent? If so, answer
                  “yes” to calculate child support for this child. Answer 'no' if you do not want to
                  calculate child support for this child. For more information, visit the help
                  centre.
                </span>
              </ToggleButtons>
            )}
          </Fragment>
        )}

        {!isOfRelationship && (
          <Fragment>
            <ToggleButtons
              name={`children.${index}.isDependent`}
              label="Is this child a legal dependent?"
              buttons={toggleButtons}
              hideIsShort
            >
              <span className="input-hint">
                Is this child a legal dependent of either person? If so, answer “yes” to deduct the
                cost of supporting this child from guideline income. Answer 'no' if you do not want
                to deduct child support from guideline income in this support calculation. This can
                be tricky: usually support is not deducted for children from prior relationships
                based on the 'first family' principle. For more information, visit the help centre.
              </span>
            </ToggleButtons>

            {isDependent && (
              <Fragment>
                <ToggleButtons
                  name={`children.${index}.priorRelationship`}
                  label="Child of Prior Relationship?"
                  buttons={toggleButtons}
                  hideIsShort
                >
                  <span className="input-hint">
                    Is the child from a prior relationship? If so, the calculator will apply the
                    'first family principle' and deduct child support for this child from guideline
                    income for both spousal and child support.
                  </span>
                </ToggleButtons>

                {priorRelationship && (
                  <Fragment>
                    <ToggleButtons
                      name={`children.${index}.supportedBy`}
                      label="Child is Supported By"
                      buttons={supportedByButtons}
                      hideIsShort
                    >
                      <span className="input-hint">
                        Which person has an obligation to support this child? Since this child is a
                        legal dependent from another relationship, the cost of supporting the child
                        will need to be calculated and deducted from their guideline income for this
                        support calculation.
                      </span>
                    </ToggleButtons>

                    <ToggleButtons
                      name={`children.${index}.supportType`}
                      label="Support Type"
                      buttons={supportTypeButtons}
                      hideIsShort
                    >
                      <span className="input-hint">
                        Select guideline support to automatically calculate and deduct guideline
                        child support for this child from the parent's guideline income.
                        Alternatively, you can deduct actual section 7 support paid or other support
                        in a specified amount.
                      </span>
                    </ToggleButtons>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}

        <ToggleButtons
          name={`children.${index}.disabled`}
          label="Child Has Disability"
          buttons={toggleButtons}
          hideIsShort
        >
          <span className="input-hint">
            Is the child eligible for the Disability Tax Credit or other recognized disability
            benefits?
          </span>
        </ToggleButtons>

        <div className={classNames('children-form-actions', { last: isLast })}>
          {isLast && (
            <Button className="add" onClick={onCreateChild} disabled={loading}>
              Add Child <Icon name="plus" />
            </Button>
          )}
          <Button className="remove" onClick={handleRemoveChild} disabled={loading}>
            <Icon name="trash" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChildForm;
