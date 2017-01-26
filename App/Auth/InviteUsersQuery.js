import gql from 'graphql-tag'

export const AllUsersQuery = gql`
  query {
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
  }
`

export const CreateChannelMutation = gql`
  mutation CreateChannel ($input: CreateChannelInput!) {
    createChannel (input: $input) {
      changedChannel {
        id
      }
    }
  }
`

export const AddUserToChannelMutation = gql`
  mutation AddUserToChannel ($input: AddToChannelsMembersConnectionInput!) {
    addToChannelsMembersConnection (input: $input){
      changedChannelsMembers {
        channel {
          id
        }
        user {
          id
        }
      }
    }
  }
`
