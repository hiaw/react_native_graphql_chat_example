import React from 'react'
import { ListView, View, Text, Button, AlertIOS } from 'react-native'

import createChannel from '../Auth/CreateChannel.js'

export default class CommentsView extends React.Component {
  constructor (props) {
    super(props)

    console.log(props.getUser)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  }

  createChannel () {
    AlertIOS.prompt('Channel name', 'Give the new channel a name',
      text => createChannel(text)
    )
  }

  render () {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
      />
        <Button title='Create Channel' onPress={() => this.createChannel(true)} />
      </View>
    )
  }
}
