import React, { Component } from 'react'
import { Text } from 'react-native'

export default class MessgeView extends Component {
  render () {
    return (
      <Text style={styles.text} >
        {this.props.username}: {this.props.content}
      </Text>
    )
  }
}

const styles = {
  text: {
    marginVertical: 5
  }
}
