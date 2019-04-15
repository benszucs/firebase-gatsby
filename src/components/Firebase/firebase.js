const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  confirmationEmailRedirect: process.env.GATSBY_FIREBASE_CONFIRMATION_EMAIL_REDIRECT,
}

class Firebase {
  constructor(app) {
    app.initializeApp(config);

    // Firebase APIs
    this.auth = app.auth();
    this.store = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}

let firebase;

function getFirebase(app, auth, store) {
  if (!firebase) {
    firebase = new Firebase(app, auth, store);
  }

  return firebase
}

export default getFirebase