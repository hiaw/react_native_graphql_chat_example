import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChannelsView from '../Components/ChannelsView.js'

import store from '../Model/MainStore.js'

class Channels extends React.Component {
  render () {
    const { loading, getUser, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      return <ChannelsView getUser={getUser} />
    }
  }
}

const UserQuery = gql`
  query UserQuery ( $id: ID! ) {
    getUser (id: $id) {
        channels {
          edges {
            node {
              id
              name
              members {
                aggregations {
                  count
                }
              }
              messages {
                aggregations {
                  count
                }
              }
            }
          }
        }
      }
    }
`

export default class ChannelsContainer extends React.Component {
  render () {
    let options = {
      options: {
        variables: {
          id: store.userDevice.scaphold_user_id
        }
      }
    }

    let ViewWithData = graphql(UserQuery, options)(Channels)

    return (
      <ViewWithData />
    )
  }
}
