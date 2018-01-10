import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:5000/graphql'}),
  cache: new InMemoryCache(),
})

const app = (
  <ApolloProvider client={ client }>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
