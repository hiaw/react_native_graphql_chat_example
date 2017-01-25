import React from 'react'
import { View, Button, AlertIOS } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import createChannel from '../Auth/CreateChannel.js'

export default class ChannelsView extends React.Component {
  createChannel () {
    AlertIOS.prompt('Channel name', 'Give the new channel a name',
      text => createChannel(text)
    )
  }

  goToChannel (id) {
    Actions.channelView({id: id})
  }

  render () {
    return (
      <View style={styles.container}>
        <List>
          {
            this.props.getUser.channels.edges.map((row, i) => (
              <ListItem key={i} title={`${row.node.name} (${row.node.members.aggregations.count})`}
                onPress={() => this.goToChannel(row.node.id)}
                badge={{value: row.node.messages.aggregations.count}} />
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
    marginTop: 60,
    backgroundColor: 'lightblue'
  }
}
