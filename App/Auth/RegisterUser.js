import gql from 'graphql-tag'
import { client } from '../Containers/ApolloContainer.js'

const CreateUserMutation = gql`
  mutation CreateUser ($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      changedUser {
        id
      }
    }
  }
`

export default function registerUser (username, password) {
  return client.mutate({
    mutation: CreateUserMutation,
    variables: {
      input: {
        username: username,
        password: password
      }
    }
  })
}
