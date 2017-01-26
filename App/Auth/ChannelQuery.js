import gql from 'graphql-tag'

export const ChannelQuery = gql`
  query ChannelQuery ( $id: ID! ) {
    getChannel (id: $id) {
      id
      messages {
        edges {
          node {
            id
            content
            author {
              username
            }
          }
        }
      }
    }
  }
`

export const CreateMessageMutation = gql`
  mutation CreateMessage ($input: CreateMessageInput!){
    createMessage (input: $input) {
      changedMessage {
        id
      }
    }
  }
`

export const SubscribeMessage = gql`
  subscription newMessages($subscriptionFilter:MessageSubscriptionFilter) {
    subscribeToMessage(mutations:[createMessage], filter: $subscriptionFilter) {
      value {
        id
        content
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`
