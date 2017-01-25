import React, { Component } from 'react'
import { observer } from 'mobx-react'

import LoginContainer from './Containers/LoginContainer.js'
import ChannelContainer from './Containers/ChannelsContainer.js'
import { ApolloContainer } from './Containers/ApolloContainer.js'

import store from './Model/MainStore.js'

@observer
export default class Root extends Component {
  render () {
    let firstScreen = <LoginContainer />

    if (store.userDevice.scaphold_user_id) {
      firstScreen = <ChannelContainer />
                                           }
    return (
      <ApolloContainer>
        {firstScreen}
      </ApolloContainer>
    )
  }
}
