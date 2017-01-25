import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import MessageView from './MessageView.js'

@observer
export default class ChannelView extends Component {
  @observable newMessage = 'New Message'

  render () {
    let messages = this.props.getChannel.messages.edges.map((message) => (
      <MessageView content={message.node.content} />
    ))
    return (
      <View style={styles.container}>
        <View style={styles.msgContainer}>
          {messages}
        </View>

        <View style={styles.row}>
          <TextInput
            multiline = {true}
            style={styles.textInput}
            placeholder='Message'
            defaultValue={this.newMessage}
            onChangeText={(value) => this.newMessage = value}
          />
          <Button
            onPress={() => this.sendMessage()}
            title='Send'
          />
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  msgContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    backgroundColor: 'antiquewhite'
  },
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
