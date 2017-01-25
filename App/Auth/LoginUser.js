import gql from 'graphql-tag'
import { client } from '../Containers/ApolloContainer.js'

const LoginMutation = gql`
  mutation LoginUser ($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        id
      }
    }
  }
`

export default function loginUser (username, password) {
  return client.mutate({
    mutation: LoginMutation,
    variables: {
      input: {
        username: username,
        password: password
      }
    }
  })
}
