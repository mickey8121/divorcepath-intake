import { gql } from '@apollo/client';

const SUBMIT_INTAKE_FORM = gql`
  mutation submitIntakeForm($data: SubmitIntakeFormInput!) @api(name: default) {
    submitIntakeForm(data: $data) {
      intakeForm {
        id
      }
    }
  }
`;

export default SUBMIT_INTAKE_FORM;
