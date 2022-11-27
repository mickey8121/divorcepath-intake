import { gql } from '@apollo/client';

const SUBMIT_INTERVIEW = gql`
  mutation submitIntakeInterview($where: IntakeInterviewWhereUniqueInput!) @api(name: default) {
    submitIntakeInterview(where: $where) {
      interview {
        id
        status
      }
    }
  }
`;

export default SUBMIT_INTERVIEW;
