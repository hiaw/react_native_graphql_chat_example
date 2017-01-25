import React from 'react'
import { Text } from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import ChannelView from '../Components/ChannelView.js'

import store from '../Model/MainStore.js'

class Channel extends React.Component {
  render () {
    const { loading, getChannel, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      return <ChannelView {...this.props} getChannel={getChannel} />
    }
  }
}

const ChannelQuery = gql`
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

const CreateMessageMutation = gql`
  mutation CreateMessage ($input: CreateMessageInput!){
    createMessage (input: $input) {
      changedMessage {
        id
      }
    }
  }
`

const ChannelContainer = compose(
  graphql(ChannelQuery, {
    options: (props) => {
      return {
        returnPartialData: true,
        variables: {
          id: props.id
        }
      }
    }
  }),
  graphql(CreateMessageMutation, {
    props: ({ mutate }) => ({
      createMessage: (channelId, content) => mutate({ variables: { input: {
        authorId: store.userDevice.scaphold_user_id,
        channelId: channelId,
        content: content
      }} })
    })
  })
)(Channel)

export default ChannelContainer

/* subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
 *     subscribeToNewMessage(mutations:[createMessage], where: $messageFilter) {
 *         mutation
 *         value {
 *             id
 *             content
 *         }
 *     }
 * } */
