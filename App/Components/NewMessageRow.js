import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'

export default class NewMessageRow extends Component {
  constructor () {
    super()
    this.state = {
      message: 'New Message'
    }
  }

  sendMessage () {
    this.props.createMessage(this.props.data.getChannel.id, this.state.message)
  }

  render () {
    return (
      <View style={styles.row}>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder='Message'
          defaultValue={this.state.message}
          onChangeText={(message) => this.setState({message})}
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
