import React from 'react'
import { Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChannelView from '../Components/ChannelView.js'

class Channel extends React.Component {
  render () {
    const { loading, getChannel, error } = this.props.data

    if (loading) {
      return <Text>Loading</Text>
    } else if (error) {
      console.log('Error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(JSON.stringify(error))
      return <Text>Error</Text>
    } else {
      return <ChannelView data={this.props.data} getChannel={getChannel} />
    }
  }
}

const ChannelQuery = gql`
  query ChannelQuery ( $id: ID! ) {
    getChannel (id: $id) {
      id
      messages {
        edges {
          node {
            id
            content
            author {
              username
            }
          }
        }
      }
    }
  }
`

export default class ChannelContainer extends React.Component {
  render () {
    let options = {
      options: {
        variables: {
          id: this.props.id
        }
      }
    }

    let ViewWithData = graphql(ChannelQuery, options)(Channel)

    return (
      <ViewWithData />
    )
  }
}
