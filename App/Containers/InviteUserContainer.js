import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { graphql, compose } from 'react-apollo'
import { Actions } from 'react-native-router-flux'

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
    const { loading, viewer, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      /* console.log(viewer) */
      return (
        <View style={styles.container}>
          <List>
            {
            viewer.allUsers.edges.map((row, i) => (
              <ListItem key={i} title={`${row.node.username}`}
                onPress={() => this.selectUser(row.node.id)} />
              ))
          }
          </List>
        </View>
      )
    }
  }
}

const InviteUsersContainer = compose(
  graphql(AllUsersQuery, {}),
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
