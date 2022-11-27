/* eslint-disable indent */
import { useMemo, useCallback, useEffect, FC } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';
import toast from 'react-hot-toast';

import Button from 'components/common/Button';

import validationSchema from 'components/intake/validation';
import IntakeInput from 'components/intake/IntakeInput';
import IntakeNameInput from 'components/intake/IntakeNameInput';
import IntakeCheckbox from 'components/intake/IntakeCheckbox';

import useIntakeTextFields from 'hooks/intake/useIntakeTextFields';

import initialValues, {
  getInitialValuesFromLocalStorage,
  IntakeInitialValues
} from 'utils/intake/initialValues';
import scrollToError from 'utils/scrollToError';

import SUBMIT_INTAKE_FORM from 'graphql/mutations/intake/submitIntakeForm';

const initialValuesFromLocalStorage = getInitialValuesFromLocalStorage();

interface NameObject {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const getNameFields = (name: string): NameObject => {
  const nameArray = name.split(' ');

  switch (nameArray.length) {
    case 0:
      throw new Error('At least 2 words are needed');

    case 1:
      throw new Error('At least 2 words are needed');

    case 2:
      return { firstName: nameArray[0], lastName: nameArray[1] };

    default:
      return {
        firstName: nameArray[0],
        middleName: nameArray[1],
        lastName: nameArray.slice(2).join(' ')
      };
  }
};

const IntakeForm: FC = () => {
  const router = useRouter();
  const { header, subHeader, footer } = useIntakeTextFields();
  const [submitIntakeForm, { loading }] = useMutation(SUBMIT_INTAKE_FORM);

  const { formUrn } = useMemo(() => router.query, [router.query]);

  const onSubmit = useCallback(
    async (values: IntakeInitialValues) => {
      const omittedValues = omit(values, ['privacy', 'name']);

      try {
        await submitIntakeForm({
          variables: { data: { ...omittedValues, formUrn, ...getNameFields(values.name) } }
        });
        void router.push(`${formUrn}/thank-you`);
      } catch (err) {
        toast.error('Sorry something went wrong...');
      }
    },
    [formUrn, router, submitIntakeForm]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: false,
    validateOnBlur: false
  });

  const { handleSubmit, values, setValues } = formik;

  useEffect(() => {
    const stringValues = JSON.stringify(values);

    if (typeof window === 'object') {
      localStorage.setItem('formState', stringValues);
    }
  }, [values]);

  useEffect(() => {
    void setValues(initialValuesFromLocalStorage, false);
  }, [setValues]);

  return (
    <FormikProvider value={formik}>
      <Form className="intake-form" onSubmit={handleSubmit}>
        <div className="intake-complement">
          <p>{header}</p>
          <p className="no-margin">{subHeader}</p>
        </div>

        <IntakeNameInput />
        <IntakeInput
          className="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="250-555-0199"
        />
        <IntakeInput
          className="email"
          name="email"
          label="Email"
          placeholder="example@domain.com"
        />
        <IntakeInput
          className="issue"
          name="issue"
          label="Your Inquiry"
          type="textarea"
          placeholder="How can we help?"
        />

        <Button type="submit" loading={loading} onClick={() => scrollToError()}>
          Send
        </Button>

        <p className="intake-complement">{footer}</p>

        <IntakeCheckbox />
      </Form>
    </FormikProvider>
  );
};

export default IntakeForm;
