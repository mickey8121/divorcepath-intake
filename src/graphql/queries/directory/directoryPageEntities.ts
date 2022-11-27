import { gql } from '@apollo/client';

const DIRECTORY_PAGE_ENTITIES = gql`
  query directoryPageEntities($where: DirectoryPageEntitiesInput!, $take: Int, $skip: Int!)
  @api(name: "default") {
    directoryPageEntities(where: $where, take: $take, skip: $skip) {
      count
      nodes {
        ... on DirectoryPageOrganizationCard {
          id
          name
          description
          formUrn
          locations {
            id
            phone
            postal
            residence
            street1
            street2
            website
            city
            email
            fax
          }
          image
          orgType
          rating
          reviewsCount
        }
        ... on DirectoryPageProfessionalCard {
          id
          name
          description
          image
          organization {
            formUrn
            name
            description
          }
          type
          rating
          reviewsCount
          locations {
            id
            phone
            postal
            residence
            street1
            street2
            website
            city
            email
            fax
          }
        }
      }
      hasNextPage
    }
  }
`;

export default DIRECTORY_PAGE_ENTITIES;
