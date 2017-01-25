import React from 'react'
import { View, Text, Button, AlertIOS } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import createChannel from '../Auth/CreateChannel.js'

export default class ChannelsView extends React.Component {
  createChannel () {
    AlertIOS.prompt('Channel name', 'Give the new channel a name',
      text => createChannel(text)
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <List>
          {
            this.props.getUser.channels.edges.map((row, i) => (
              <ListItem key={i} title={`${row.node.name} (${row.node.members.aggregations.count})`} />
              ))
          }
        </List>
        <Button title='Create Channel' onPress={() => this.createChannel(true)} />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'lightblue'
  }
}
