import gql from 'graphql-tag'
import { client } from '../Containers/ApolloContainer.js'

const AddUserToChannelMutation = gql`
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

export default function addUserToChannel (userId, channelId) {
  return client.mutate({
    mutation: AddUserToChannelMutation,
    variables: {
      input: {
        userId: userId,
        channelId: channelId
      }
    }
  })
}
