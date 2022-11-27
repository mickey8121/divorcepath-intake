import { gql } from '@apollo/client';

const MARK_INTERVIEW_IS_OPENED = gql`
  mutation markInterviewAsOpened($where: IntakeInterviewWhereUniqueInput!) @api(name: default) {
    markInterviewAsOpened(where: $where) {
      interview {
        id
      }
    }
  }
`;

export default MARK_INTERVIEW_IS_OPENED;
