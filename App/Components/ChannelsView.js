import React from 'react'
import { ListView, View, Text, Button, AlertIOS } from 'react-native'

import createChannel from '../Auth/CreateChannel.js'

export default class CommentsView extends React.Component {
  constructor (props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.getUser.channels.edges)
    }
  }

  createChannel () {
    AlertIOS.prompt('Channel name', 'Give the new channel a name',
      text => createChannel(text)
    )
  }

  _renderRow (rowData) {
    let row = rowData.node
    return (
      <Text>{`${row.name} (${row.members.aggregations.count})`}</Text>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
        <Button title='Create Channel' onPress={() => this.createChannel(true)} />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  }
}
