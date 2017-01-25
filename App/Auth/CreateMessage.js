import gql from 'graphql-tag'
import { client } from '../Containers/ApolloContainer.js'

import store from '../Model/MainStore.js'

const CreateMessageMutation = gql`
  mutation CreateMessage ($input: CreateMessageInput!){
    createMessage (input: $input) {
      changedMessage {
        id
      }
    }
  }
`

export default function createMessage (channelId, content) {
  return client.mutate({
    mutation: CreateMessageMutation,
    variables: {
      input: {
        authorId: store.userDevice.scaphold_user_id,
        channelId: channelId,
        content: content
      }
    }
  })
}
