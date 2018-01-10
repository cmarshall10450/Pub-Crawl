import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import barsNearBy from './queries/barsNearBy'

class App extends Component {

  renderBar (bar) {
    return (
      <div>
        <h1>{ bar.name }</h1>
      </div>
    )
  }

  render () {
    const {barsNearLocation, loading} = this.props.data

    return (
      <div className='App'>
        { !loading && barsNearLocation.map(bar => this.renderBar(bar)) }
      </div>
    )
  }
}

export default graphql(barsNearBy, {
  options: {
    variables: {
      name: 'Shakespeare\'s',
      distance: 1000,
    },
  },
})(App)
