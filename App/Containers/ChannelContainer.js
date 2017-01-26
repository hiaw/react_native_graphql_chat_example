import React from 'react'
import { View, Text, Button } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { Actions } from 'react-native-router-flux'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import NewMessageRow from '../Components/NewMessageRow.js'
import MessageView from '../Components/MessageView.js'
import { ChannelQuery, CreateMessageMutation, SubscribeMessage } from '../Auth/ChannelQuery.js'

import store from '../Model/MainStore.js'

@observer
class Channel extends React.Component {
  subscribeToNewMessages () {
    this.subscription = this.props.data.subscribeToMore({
      document: SubscribeMessage,
      variables: {
        subscriptionFilter: {
          channelId: {
            eq: this.props.id
          }
        }
      },
      updateQuery: (prev, { subscriptionData }) => {
        const newEdges = [
          ...prev.getChannel.messages.edges,
          {
            node: {
              ...subscriptionData.data.subscribeToMessage.value
            }
          }
        ]
        return {
          getChannel: {
            messages: {
              edges: newEdges
            }
          }
        }
      }
    })
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.data.loading &&
      newProps.data.getChannel) {
      if (!this.props.data.getChannel ||
        newProps.data.getChannel.id !== this.props.data.getChannel.id) {
        // If we change channels, subscribe to the new channel
        this.subscribeToNewMessages()
      }
    }
  }

  showInviteUser() {
    Actions.inviteUser({channelId: this.props.id})
  }

  render () {
    const { loading, getChannel, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      let messages = getChannel.messages.edges.map((message) => (
        <MessageView key={message.node.id}
          username={message.node.author.username}
          content={message.node.content} />
      ))

      return (
        <View style={styles.container}>
          <Button title='Invite User'
            onPress={() => this.showInviteUser()} />
          <View style={styles.msgContainer}>
            {messages}
          </View>

          <NewMessageRow {...this.props} />
        </View>
      )
    }
  }
}

const ChannelContainer = compose(
  graphql(ChannelQuery, {
    options: (props) => {
      return {
        returnPartialData: true,
        variables: {
          id: props.id,
          messageOrder: [
            {
              field: 'createdAt',
              direction: 'ASC'
            }
          ]
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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'lightblue'
  },
  msgContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    backgroundColor: 'antiquewhite'
  }
}
