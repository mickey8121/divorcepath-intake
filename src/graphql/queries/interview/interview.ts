import { gql } from '@apollo/client';

import interviewFragment from 'graphql/fragments/interview';

const INTERVIEW = gql`
  ${interviewFragment}

  query interview($where: IntakeInterviewWhereUniqueInput!) @api(name: "default") {
    interview(where: $where) {
      ...interviewFragment
    }
  }
`;

export default INTERVIEW;
