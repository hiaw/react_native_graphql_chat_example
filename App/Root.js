import React, { Component } from 'react'
import LoginContainer from './Components/LoginContainer.js'
import { ApolloContainer } from './Components/ApolloContainer.js'

export default class Root extends Component {
  render () {
    return (
      <ApolloContainer>
        <LoginContainer content='testing' />
      </ApolloContainer>
    )
  }
}
