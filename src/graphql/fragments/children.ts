import { gql } from '@apollo/client';

const childrenFragment = gql`
  fragment childrenFragment on Children {
    id
    disabled
    firstName
    gender
    parenting
    isOfRelationship
    birthDate
    claimAsDependent
    isDependent
    supportedBy
    supportType
    priorRelationship
  }
`;

export default childrenFragment;
