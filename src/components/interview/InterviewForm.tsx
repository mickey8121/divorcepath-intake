import { useCallback, FC, useMemo } from 'react';

import { Form, FormikProvider, useFormik } from 'formik';

import Input from 'components/common/form/Input';

import AutoSave from 'components/interview/AutoSave';
import InterviewSection from 'components/interview/InterviewSection';
import AddressForm from 'components/interview/forms/AddressForm';
import ChildrenForm from 'components/interview/forms/ChildrenForm';
import ContactsForm from 'components/interview/forms/ContactsForm';
import LegalIssueForm from 'components/interview/forms/LegalIssueForm';
import PersonForm from 'components/interview/forms/PersonForm';
import RelationshipForm from 'components/interview/forms/RelationshipForm';
import SubmitForm from 'components/interview/forms/SubmitForm';
import InterviewSidebar from 'components/interview/InterviewSidebar';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

import { IntakeInterview } from 'generated/graphql';

interface Props {
  interview?: IntakeInterview;
}

const InterviewForm: FC<Props> = ({ interview }) => {
  const { askStory } = useInterviewOptions();

  const getSectionNumber = useCallback(
    (number: number) => {
      if (askStory) return number;

      return number - 1;
    },
    [askStory]
  );

  const onSubmit = useCallback(async () => {
    try {
      await new Promise(resolve => resolve(true));
    } catch (err) {}
  }, []);

  const initialValues = useMemo(() => (interview || {}) as IntakeInterview, [interview]);

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true
  });

  const { handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form className="interview-form" onSubmit={handleSubmit}>
        <div className="sections-container">
          {askStory && (
            <InterviewSection
              title="Your Legal Problem"
              number={1}
              bodyClassName="legal-issue-section"
            >
              <LegalIssueForm />
              <div className="section-body-content">
                <div className="body-left-side">
                  <h5>Your story</h5>
                </div>

                <div className="body-right-side">
                  <Input type="textarea" name="story" placeholder="Text...">
                    <span className="input-hint">
                      Any other background information you'd like to tell us about.
                    </span>
                  </Input>
                </div>
              </div>
            </InterviewSection>
          )}

          <InterviewSection
            title="Background"
            number={getSectionNumber(2)}
            bodyClassName="background-section"
          >
            <div className="hint">
              Some background information is required to calculate support. For example, support
              payments can vary significantly by province. If client wish to generate an anonymous
              report, you may use a pseudonym or placeholder name.
            </div>
            <PersonForm partyType="profile" />
            <PersonForm partyType="exProfile" />
          </InterviewSection>

          <InterviewSection
            title="Relationship"
            number={getSectionNumber(3)}
            bodyClassName="background-section"
          >
            <div className="hint">
              For support purposes, the duration of the relationship is calculated based on the date
              the parties started living together (the "cohabitation date"). This may or may not be
              the same as the date the parties were married.
            </div>
            <RelationshipForm />
          </InterviewSection>

          <InterviewSection
            title="Children"
            number={getSectionNumber(4)}
            bodyClassName="children-section"
          >
            <div className="hint">
              Dependent children of the relationship are listed below. Select the appropriate
              parenting relationship and add any special child-related expenses.
            </div>
            <ChildrenForm />
          </InterviewSection>

          <InterviewSection
            title="Address"
            number={getSectionNumber(5)}
            bodyClassName="address-section"
          >
            <AddressForm partyType="address" />
            <AddressForm partyType="exAddress" />
          </InterviewSection>

          <InterviewSection
            title="Contact"
            number={getSectionNumber(6)}
            bodyClassName="contacts-section"
          >
            <ContactsForm partyType="profile" />
            <ContactsForm partyType="exProfile" />
          </InterviewSection>

          <InterviewSection
            title="Submit Interview"
            number={getSectionNumber(7)}
            bodyClassName="submit-section"
          >
            <SubmitForm />
          </InterviewSection>
        </div>

        <div className="sidebar-container">
          <InterviewSidebar />
        </div>
      </Form>
      <AutoSave />
    </FormikProvider>
  );
};

export default InterviewForm;
