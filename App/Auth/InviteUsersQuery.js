import gql from 'graphql-tag'

export const AllUsersQuery = gql`
  query ($id: ID!){
    viewer {
      allUsers {
        edges {
          node {
            id
            username
          }
        }
      }
    }
    getChannel (id: $id) {
      id
      members {
        edges {
          node {
            id
            username
          }
        }
      }
    }
  }
`
