import { gql } from '@apollo/client';

const ALL_PROVINCE = gql`
  query allProvince @api(name: "sanity") {
    allProvince {
      _id
      name
      shorthand
      article {
        _id
        title
        bodyRaw
        resources {
          _id
          title
          link
          description
        }
      }
      cities {
        name
        article {
          _id
          title
          bodyRaw
          resources {
            _id
            title
            link
            description
          }
        }
      }
    }
  }
`;

export default ALL_PROVINCE;
