import React from 'react'
import { Text } from 'react-native'
import { graphql, compose } from 'react-apollo'

import ChannelsView from '../Components/ChannelsView.js'
import { UserChannelQuery, CreateChannelMutation, AddUserToChannelMutation } from '../Auth/ChannelsQuery.js'

import store from '../Model/MainStore.js'

class Channels extends React.Component {
  render () {
    const { loading, getUser, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      return <ChannelsView {...this.props} getUser={getUser} />
    }
  }
}

const ChannelsContainer = compose(
  graphql(UserChannelQuery, {
    options: (props) => {
      return {
        variables: {
          id: store.userDevice.scaphold_user_id
        }
      }
    }
  }),
  graphql(CreateChannelMutation, {
    props: ({ mutate }) => ({
      createChannel: (name) => mutate({ variables: { input: {
        name: name
      }} })
    })
  }),
  graphql(AddUserToChannelMutation, {
    props: ({ mutate }) => ({
      addUserToChannel: (channelId) => mutate({ variables: { input: {
        userId: store.userDevice.scaphold_user_id,
        channelId: channelId
      }} })
    })
  })
)(Channels)

export default ChannelsContainer
