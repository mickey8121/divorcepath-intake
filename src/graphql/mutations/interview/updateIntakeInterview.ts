import { gql } from '@apollo/client';

import interviewFragment from 'graphql/fragments/interview';

const UPDATE_INTERVIEW = gql`
  ${interviewFragment}
  mutation updateIntakeInterview(
    $where: IntakeInterviewWhereUniqueInput!
    $data: UpdateIntakeInterviewInput!
  ) @api(name: default) {
    updateIntakeInterview(where: $where, data: $data) {
      interview {
        ...interviewFragment
      }
    }
  }
`;

export default UPDATE_INTERVIEW;
