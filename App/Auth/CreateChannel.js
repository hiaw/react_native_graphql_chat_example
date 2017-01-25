import gql from 'graphql-tag'
import { client } from '../Containers/ApolloContainer.js'

import addUserToChannel from './AddUserToChannel.js'

import store from '../Model/MainStore.js'

const CreateChannelMutation = gql`
  mutation CreateChannel ($input: CreateChannelInput!) {
    createChannel (input: $input) {
      changedChannel {
        id
      }
    }
  }
`

export default function createChannel (name) {
  client.mutate({
    mutation: CreateChannelMutation,
    variables: {
      input: {
        name: name
      }
    }
  }).then(res => {
    console.log(res)
    addUserToChannel(store.userDevice.scaphold_user_id, res.data.createChannel.changedChannel.id)
      .then(res => {
        console.log(res)
      })
  })
}
