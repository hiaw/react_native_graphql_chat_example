import gql from 'graphql-tag'

export const LoginMutation = gql`
  mutation LoginUser ($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        username
        id
      }
    }
  }
`

export const CreateUserMutation = gql`
  mutation CreateUser ($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      changedUser {
        username
        id
      }
    }
  }
`
