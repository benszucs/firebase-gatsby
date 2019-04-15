# Gatsby starter with firebase authentication and admin portal

Having created a number of gatsby blogs using headless CMS systems I feel like now is the perfect time to level up my skills and create a starter project that can be used for a website that needs a client portal. This project should serve as reference to how to set up a website using Gatsby SSG, Firebase auth, database & cloud functions.

### Research

This starter closely follows the following tutorial & starter projects, but I'm thinking of introducting cloud functions to the mix.

- Tutorial: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
- Starter: https://github.com/the-road-to-react-with-firebase/react-gatsby-firebase-authentication

### Notes

1. Install & strip gatsby starter `gatsby new firebase-gatsby`
2. Set up the folder structure: we will need: Landing page, Layout component, Navigation with links, Private page, Account Page, Admin Page, Sign-in, Sign-up & Pw Forget pages.
3. Set up Sign in and Sign up forms (logging state to console for now)
4. Start setting up Firebase... (had to install -v 5.6.0 because of an error)

`src/components/Firebase/firebase`

```javascript
const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  confirmationEmailRedirect:
    process.env.GATSBY_FIREBASE_CONFIRMATION_EMAIL_REDIRECT,
}

class Firebase {
  constructor() {
    app.initializeApp(config)
  }
}

let firebase

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database)
  }

  return firebase
}

export default getFirebase
```

We don't import any `firebase` packages insted we export a function that check if a `firebase` package has been initalized already. (Singleton pattern)
Now in the components that need `firebase`, we can wait until the componentDidMount lifecycle method, to ensure the `window` object exists.
Let's add it to the `Layout` component so every page will have access to the `firebase` instance.

`src/components/Layout`

```javascript
...
state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }
...
```

With this code in place, we can make reads and writes to the Firebase database from a component.

5. Create a firebase context, to provide the `firebase` instance to any desired component.
   Provider: `src/components/Firebase/context`

```javascript
import React from "react"

const FirebaseContext = React.createContext(null)

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
```

Consumer: `src/components/Layout`

```javascript
...
render() {
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
```
Now any page that has the Layout (all) will have access to our `firebase` instance with it's methods, auth API & firestore.