import gql from 'graphql-tag'

export const UserChannelQuery = gql`
  query UserQuery ( $id: ID! ) {
    getUser (id: $id) {
        channels {
          edges {
            node {
              id
              name
              members {
                aggregations {
                  count
                }
              }
              messages {
                aggregations {
                  count
                }
              }
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
