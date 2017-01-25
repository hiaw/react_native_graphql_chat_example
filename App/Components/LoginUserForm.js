import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class LoginUserForm extends Component {
  @observable loginEmail = 'test@test.com'
  @observable loginPassword = '123456'

  loginUser () {
    this.props.loginUser(this.state.loginEmail, this.state.loginPassword)
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
      style={styles.textInput}
          placeholder=' Email'
          defaultValue={this.loginEmail}
          onChangeText={(value) => this.loginEmail = value}
        />
        <TextInput
          style={styles.textInput}
          placeholder=' Password'
          defaultValue={this.loginPassword}
          onChangeText={(value) => this.loginPassword = value}
          secureTextEntry
        />
        <Button
          onPress={() => this.loginUser()}
          title='Login'
        />
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingLeft: 10
  }
}
