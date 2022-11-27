/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useMemo } from 'react';

import { useFormikContext } from 'formik';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { omit } from 'lodash';
import { toast } from 'react-toastify';

import Icon from 'components/common/Icon';

import ChildForm from 'components/interview/forms/ChildForm';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import { defaultChild } from 'utils/defaultValues';

import { IntakeInterview, useUpdateIntakeInterviewMutation } from 'generated/graphql';

const ChildrenForm: FC = () => {
  const { setIsSaving, isCompleted } = useInterviewOptions();

  const { values, setFieldValue } = useFormikContext<IntakeInterview>();

  const children = useMemo(() => values.children || [], [values.children]);

  const [updateInterview, { loading }] = useUpdateIntakeInterviewMutation();

  const { query } = useRouter();

  const handleCreateChild = useCallback(async () => {
    setFieldValue('children', [
      ...children,
      {
        ...omit(defaultChild, 'childIncome', 'supportDeductible'),
        firstName: `Child ${children.length + 1}`
      }
    ]);

    setIsSaving(true);

    try {
      await updateInterview({
        variables: {
          where: { token: query.token as string },
          data: {
            children: {
              create: [
                {
                  ...omit(defaultChild, 'id', 'childIncome', 'supportDeductible'),
                  firstName: `Child ${children.length + 1}`
                }
              ]
            }
          }
        }
      });
    } catch {
      toast.error(
        'The time for completing this interview has expired or has already been sent. If you have any questions, contact support or a lawyer.'
      );
    } finally {
      setIsSaving(false);
    }
  }, [children, query.token, updateInterview, setFieldValue, setIsSaving]);

  const handleRemoveChild = useCallback(
    async id => {
      setFieldValue(
        'children',
        children.filter(child => child.id !== id)
      );

      setIsSaving(true);

      try {
        await updateInterview({
          variables: {
            where: { token: query.token as string },
            data: {
              children: {
                delete: [
                  {
                    id
                  }
                ]
              }
            }
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
    [query.token, updateInterview, children, setFieldValue, setIsSaving]
  );

  if (!children.length)
    return (
      <div className="children-form no-children">
        <Button className="add" onClick={handleCreateChild as any} disabled={isCompleted}>
          Add Child <Icon name="plus" />
        </Button>
      </div>
    );

  return (
    <div className="children-form">
      {children.map((child, index) => (
        <ChildForm
          child={child}
          index={index}
          key={index}
          isLast={index === children.length - 1}
          loading={loading || isCompleted}
          onRemoveChild={handleRemoveChild as any}
          onCreateChild={handleCreateChild as any}
        />
      ))}
    </div>
  );
};

export default ChildrenForm;
