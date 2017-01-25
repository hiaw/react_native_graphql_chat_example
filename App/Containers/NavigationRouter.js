import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Actions, Scene, Router, ActionConst } from 'react-native-router-flux'

import { ApolloContainer, setAuthorization } from '../Containers/ApolloContainer.js'

// Containers
import LoginContainer from '../Containers/LoginContainer.js'
import ChannelsContainer from '../Containers/ChannelsContainer.js'
import ChannelContainer from '../Containers/ChannelContainer.js'

export default class NavigationRouter extends Component {
  componentWillMount () {
    AsyncStorage.getItem('userDevice', (err, result) => {
      if (err) {
      } else {
        let results = JSON.parse(result)
        if (results) {
          let id = results.scaphold_user_id
          if (id !== '') {
            Actions.channels({type: ActionConst.REPLACE})
          }
          let token = results.scaphold_access_token
          if (token !== '') {
            setAuthorization(token)
          }
        }
      }
    })
  }

  render () {
    return (
      <ApolloContainer>
        <Router>
          <Scene key='login' component={LoginContainer} hideNavBar />
          <Scene key='channels' component={ChannelsContainer} hideNavBar={false} />
          <Scene key='channelView' component={ChannelContainer} hideNavBar={false} />
        </Router>
      </ApolloContainer>
    )
  }
}
