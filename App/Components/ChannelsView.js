import React from 'react'
import { ListView, View, Text, Button } from 'react-native'

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
  }

  render () {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
      />
        <Button title='Create Channel' onPress={() => this.setModalVisible(true)} />
      </View>
    )
  }
}
