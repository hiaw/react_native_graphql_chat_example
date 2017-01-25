import React, { Component } from 'react'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Client } from 'subscriptions-transport-ws'

import addGraphQLSubscriptions from './addGraphQLSubscriptions.js'

const serverUrl = 'us-west-2.api.scaphold.io/graphql/panicky-bait'
const graphqlUrl = `https://${serverUrl}`
const networkInterface = createNetworkInterface({uri: graphqlUrl})

const logErrors = {
  applyAfterware ({ response }, next) {
    /* console.log(response) */
    if (!response.ok) {
      response.clone().text().then(bodyText => {
        if (response.status === 403) {
        } else {
          console.error(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`)
        }
        next()
      })
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          console.error('GraphQL Errors:', errors.map(e => e.message))
        }
        next()
      })
    }
  }
}

networkInterface.useAfter([logErrors])

function emptyAuthorization (token) {
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (req.options.headers) {
        delete req.options.headers
      }
      next()
    }
  }])
}

function setAuthorization (token) {
  /* console.log(token) */
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      req.options.headers.Authorization = `Bearer ${token}`
      next()
    }
  }])
}

function makeApolloClient () {
  const websocketUrl = `wss://${serverUrl}`
  const wsClient = new Client(websocketUrl)
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient)

  const clientGraphql = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: {}
  })
  return clientGraphql
}

let client = makeApolloClient()

class ApolloContainer extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    )
  }
}

export { ApolloContainer, client, setAuthorization, serverUrl }
