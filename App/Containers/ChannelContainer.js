import React from 'react'
import { Text } from 'react-native'
import { graphql, compose } from 'react-apollo'
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

const ChannelContainer = compose(
  graphql(ChannelQuery, {
    options: (props) => {
      return {
        returnPartialData: true,
        variables: {
          id: props.id
        }
      }
    }
  })
)(Channel)

export default ChannelContainer

/* subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
 *     subscribeToNewMessage(mutations:[createMessage], where: $messageFilter) {
 *         mutation
 *         value {
 *             id
 *             content
 *         }
 *     }
 * } */
