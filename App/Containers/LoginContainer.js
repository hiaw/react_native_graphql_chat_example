import React, { Component } from 'react'
import { observer } from 'mobx-react'

import LoginUserForm from '../Components/LoginUserForm.js'
import ChannelView from '../Components/ChannelView.js'

import store from '../Model/MainStore.js'

@observer
export default class LoginContainer extends Component {
  render () {
    if (store.userDevice.scaphold_user_id) {
      return (
        <ChannelView />
      )
    } else {
      return (
        <LoginUserForm />
      )
    }
  }
}
