import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class NewMessageRow extends Component {
  @observable message = 'New Message'

  sendMessage () {
    this.props.createMessage(this.props.data.getChannel.id, this.message)
  }

  render () {
    return (
      <View style={styles.row}>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder='Message'
          defaultValue={this.message}
          onChangeText={(message) => this.message = message}
        />
        <Button
          onPress={() => this.sendMessage()}
          title='Send'
        />
      </View>
    )
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    marginVertical: 5
  },
  textInput: {
    flex: 1,
    height: 100,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10
  }
}
