import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChannelsView from '../Components/ChannelsView.js'

class Channels extends React.Component {
  render () {
    const { loading, viewer, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      return <ChannelsView viewer={viewer} />
    }
  }
}

const UserQuery = gql`
  query ChannelQuery {
    viewer {
      allChannels {
        edges {
          node {
            messages {
              edges {
                node {
                  content
                }
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
    if (this.props.id === '') {
      return <ChannelView />
    }

    let options = {
      options: {
        variables: {
          id: this.props.id
        }
      }
    }

    let ViewWithData = graphql(UserQuery, options)(Channels)

    return (
      <ViewWithData />
    )
  }
}
