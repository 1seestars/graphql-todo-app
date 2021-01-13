import { ApolloClient, ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { cache } from './cache'

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
