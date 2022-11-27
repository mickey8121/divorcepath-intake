import { gql } from '@apollo/client';

import childrenFragment from 'graphql/fragments/children';

const interviewFragment = gql`
  ${childrenFragment}
  fragment interviewFragment on Interview {
    id
    clientEmail
    organizationId
    token
    tokenExpiresAt
    status
    type
    intakeInterview {
      id
      legalIssues {
        id
        name
      }
      profile {
        firstName
        lastName
        gender
        phone
        email
        birthDate
        residence
        hasNewPartner
      }
      address {
        city
        country
        postal
        residence
        street1
      }
      exProfile {
        firstName
        lastName
        gender
        phone
        email
        birthDate
        residence
        hasNewPartner
      }
      exAddress {
        city
        country
        postal
        residence
        street1
      }
      relationship {
        cohabitationDate
        isMarried
        isSeparated
        marriageDate
        marriagePlace
        separationDate
        isDivorced
        divorceDate
      }
      children {
        ...childrenFragment
      }
      exLawyer
      exLawyerName
      exLawyerCompanyName
      story
      askStory
      shortInterview
    }
    createdAt
    updatedAt
  }
`;

export default interviewFragment;
