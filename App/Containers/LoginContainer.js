import { graphql, compose } from 'react-apollo'

import LoginUserForm from '../Components/LoginUserForm.js'
import { LoginMutation, CreateUserMutation } from '../Auth/LoginQuery.js'

const LoginContainer = compose(
  graphql(LoginMutation, {
    props: ({ mutate }) => ({
      loginUser: (username, password) => mutate({ variables: { input: {
        username: username,
        password: password
      }} })
    })
  }),
  graphql(CreateUserMutation, {
    props: ({ mutate }) => ({
      registerUser: (username, password) => mutate({ variables: { input: {
        username: username,
        password: password
      }} })
    })
  })
)(LoginUserForm)

export default LoginContainer
