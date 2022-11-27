import { useMemo } from 'react';

import useIntakeFromProvider from 'hooks/intake/useIntakeFromProvider';

type UseIntakeTextFields = () => {
  header: string;
  subHeader: string;
  footer: string;
};

const useIntakeTextFields: UseIntakeTextFields = () => {
  const { intakeFormHeader, intakeFormFooter } = useIntakeFromProvider();

  const parsedHeaders = useMemo(() => {
    try {
      const headers = JSON.parse(intakeFormHeader || '{}');

      return {
        header: headers.intakeFormHeader,
        subHeader: headers.intakeFormSubHeader
      };
    } catch (err) {
      return {};
    }
  }, [intakeFormHeader]);

  const header = useMemo(
    () =>
      parsedHeaders.header ||
      'Free 15-minute phone consultation with a family lawyer. We can discuss your divorce or other legal matter and next steps.',
    [parsedHeaders.header]
  );

  const subHeader = useMemo(
    () => parsedHeaders.subHeader || 'All discussions confidential.',
    [parsedHeaders.subHeader]
  );

  const footer = useMemo(
    () =>
      intakeFormFooter ||
      'We normally respond within one business day. Your inquiry does not create a solicitor/client relationship.',
    [intakeFormFooter]
  );

  return {
    header,
    subHeader,
    footer
  };
};

export default useIntakeTextFields;
