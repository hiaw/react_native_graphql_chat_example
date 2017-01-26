import gql from 'graphql-tag'

export const ChannelQuery = gql`
  query ChannelQuery ( $id: ID!, $messageOrder: [MessageOrderByArgs]) {
    getChannel (id: $id) {
      id
      messages (last: 50, orderBy: $messageOrder) {
        edges {
          node {
            id
            content
            createdAt
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
