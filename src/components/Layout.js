import React, { Component, Fragment } from 'react'
import Navigation from './Navigation'

class Layout extends Component {
  render() {
    return(
      <Fragment>
        <Navigation />
        <hr />
        {this.props.children}
      </Fragment>
    )
  }
}

export default Layout