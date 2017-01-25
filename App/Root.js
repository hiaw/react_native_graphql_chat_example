import React, { Component } from 'react'
import LoginContainer from './Containers/LoginContainer.js'
import { ApolloContainer } from './Containers/ApolloContainer.js'

export default class Root extends Component {
  render () {
    return (
      <ApolloContainer>
        <LoginContainer content='testing' />
      </ApolloContainer>
    )
  }
}
