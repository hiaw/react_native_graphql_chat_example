import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { graphql, compose } from 'react-apollo'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import { AllUsersQuery } from '../Auth/InviteUsersQuery.js'
import { AddUserToChannelMutation } from '../Auth/ChannelsQuery.js'

class InviteUser extends React.Component {
  selectUser (id) {
    console.log('selecting user')
    console.log(id)
    this.props.addUserToChannel(id, this.props.channelId)
      .then(res => Actions.pop())
  }

  render () {
    const { loading, viewer, getChannel, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      let existingChannelMembers = getChannel.members.edges.map((row) => {
        return {
          username: row.node.username,
          id: row.node.id }
      })
      let allMembers = viewer.allUsers.edges.map((row) => {
        return {
          username: row.node.username,
          id: row.node.id }
      })

      let uninvitedUser = _.differenceBy(allMembers, existingChannelMembers, 'id')

      return (
        <View style={styles.container}>
          <List>
            {
            uninvitedUser.map((row, i) => (
              <ListItem key={i} title={`${row.username}`}
                onPress={() => this.selectUser(row.id)} />
              ))
          }
          </List>
        </View>
      )
    }
  }
}

const InviteUsersContainer = compose(
  graphql(AllUsersQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.channelId
        }
      }
    }
  }),
  graphql(AddUserToChannelMutation, {
    props: ({ mutate }) => ({
      addUserToChannel: (id, channelId) => mutate({ variables: { input: {
        userId: id,
        channelId: channelId
      }} })
    })
  })
)(InviteUser)

export default InviteUsersContainer

const styles = {
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'lightblue'
  }
}
