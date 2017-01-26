import React from 'react'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { graphql, compose } from 'react-apollo'

import { AllUsersQuery } from '../Auth/InviteUsersQuery.js'

import store from '../Model/MainStore.js'

class InviteUser extends React.Component {
  selectUser () {
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
      console.log(viewer)
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
  graphql(AllUsersQuery, {
    options: (props) => {
      return {
        variables: {
          id: store.userDevice.scaphold_user_id
        }
      }
    }
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
