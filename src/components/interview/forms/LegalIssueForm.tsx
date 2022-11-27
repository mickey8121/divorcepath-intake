import { FC, useCallback, useMemo } from 'react';

import { useFormikContext } from 'formik';
import { Options } from 'react-select';

import SelectField from 'components/common/form/SelectField';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';
import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import { IntakeInterview } from 'generated/graphql';

const LegalIssueForm: FC = () => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<IntakeInterview>();

  const { issues, phone } = useIntakeFromProvider();

  const { orgName } = useInterviewOptions();

  const issuesOptions = useMemo(
    () =>
      issues?.map(issue => ({
        value: issue?.id,
        label: issue?.name
      })),
    [issues]
  );

  const handleSelectIssue = useCallback(
    (value: unknown) => {
      const selectedOptions = (value as Options<{ value: string; label: string }>).map(v => ({
        id: v.value,
        name: v.label
      }));

      setFieldValue('legalIssues', selectedOptions);
      setFieldTouched('legalIssues', true);
    },
    [setFieldValue, setFieldTouched]
  );

  const showHint = useMemo(() => {
    const selectedIssuesLabels = values?.legalIssues?.map(issue => issue.name);

    return selectedIssuesLabels?.find(s =>
      ['Court Application', 'Emergency Protection'].includes(s as string)
    );
  }, [values?.legalIssues]);

  const selectedValue = useMemo(
    () =>
      values?.legalIssues?.map(issue => ({
        value: issue.id,
        label: issue.name
      })),
    [values?.legalIssues]
  );

  return (
    <div className="section-body-content">
      <div className="body-left-side">
        <h5>Select Legal Issues</h5>
      </div>
      <div className="body-right-side">
        <SelectField
          value={selectedValue}
          name="legalIssues"
          options={issuesOptions}
          placeholder="Unassigned"
          onChange={handleSelectIssue}
          isMulti
          isClearable={false}
        />
        {!!showHint && (
          <div className="hint">
            "For urgent help, please call <span className="org-name">{orgName}</span> at {phone}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalIssueForm;
