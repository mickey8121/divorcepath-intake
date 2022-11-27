import { FC, useCallback, useEffect } from 'react';

import { useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';

import usePrevValue from 'hooks/interview/usePrevValue';
import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import difference from 'utils/difference';
import prepareValuesForUpdate from 'utils/interview/prepareValuesForUpdate';

import { IntakeInterview, useUpdateIntakeInterviewMutation } from 'generated/graphql';

const AutoSave: FC = () => {
  const { values } = useFormikContext<IntakeInterview>();

  const [updateInterview] = useUpdateIntakeInterviewMutation();

  const { query } = useRouter();

  const { setIsSaving, isSaving } = useInterviewOptions();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...formikValues } = values || {};

  const prevValues = usePrevValue(formikValues);

  const onSubmit = useCallback(
    async (valuesForUpdate?: IntakeInterview) => {
      setIsSaving(true);

      try {
        await updateInterview({
          variables: {
            where: { token: query.token as string },
            data: prepareValuesForUpdate(values, valuesForUpdate as IntakeInterview)
          }
        });
      } catch {
        toast.error(
          'The time for completing this interview has expired or has already been sent. If you have any questions, contact support or a lawyer.'
        );
      } finally {
        setIsSaving(false);
      }
    },
    [values, query.token, updateInterview, setIsSaving]
  );

  const debouncedSubmit = useDebouncedCallback(async () => onSubmit(), 3000);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (Object.keys(difference(formikValues, prevValues) || {}).length && !isSaving) {
      if (prevValues?.children?.length === formikValues.children?.length) {
        if (prevValues.legalIssues.length === formikValues.legalIssues?.length) {
          void debouncedSubmit();
        } else {
          void onSubmit(prevValues as IntakeInterview);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikValues, prevValues]);

  return null;
};

export default AutoSave;
