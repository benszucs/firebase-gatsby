import React, { Component, Fragment } from "react"
import Navigation from "./Navigation"
import getFirebase, { FirebaseContext } from "./Firebase"

class Layout extends Component {
  state = {
    firebase: null,
  }

  componentDidMount() {
    const app = import("firebase/app")
    const auth = import("firebase/auth")
    const store = import("firebase/firestore")

    Promise.all([app, auth, store]).then(values => {
      const firebase = getFirebase(values[0])

      this.setState({ firebase })
    })
  }

  render() {
    // console.log(this.state.firebase)
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <Fragment>
          <Navigation />
          <hr />
          {this.props.children}
        </Fragment>
      </FirebaseContext.Provider>
    )
  }
}

export default Layout
