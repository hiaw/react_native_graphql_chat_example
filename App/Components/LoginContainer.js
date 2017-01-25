import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LoginUserForm from '../Components/LoginUserForm.js'

class LoginContainer extends Component {

  constructor (props) {
    super(props)
    this.loginUser = this.loginUser.bind(this)
  }

  loginUser (username, password) {
    let vars = { input: {username: username, password: password} }
    this.props.mutate({variables: vars})
      .then(({data}) => {
        /* console.log(data) */
      }).catch(error => {
        console.log(error)
      })
    /* Auth.login(this.state.loginEmail, this.state.loginPassword)
     *     .then((result) => {
     *       let loggedInUser = {
     *         id: result.loginUser.id,
     *         scapholdAuthToken: result.loginUser.token,
     *         email: this.state.loginEmail
     *       }

     *       AsyncStorage.setItem('currentUser', JSON.stringify(loggedInUser), () => {
     *         AsyncStorage.getItem('currentUser', (err, res) => {
     *           setNetworkLayer().then(() => {
     *             NavigationActions.firstLaunch()
     *           })
     *         })
     *       })
     *     }).catch((error) => {
     *       this.setState({errors: 'Error: ' + error})
     *     }) */
  }

  render () {
    return (
      <LoginUserForm
        loginUser={this.loginUser} />
    )
  }
}

const LoginMutation = gql`
  mutation LoginUser ($input: _LoginUserInput!) {
    loginUser(input: $input) {
      id
      clientMutationId
      token
    }
  }
`

export default graphql(LoginMutation)(LoginContainer)
