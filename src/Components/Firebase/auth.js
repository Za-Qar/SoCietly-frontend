import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

export const auth = firebase.auth();

//create an instance of the google provider object
var provider = new firebase.auth.GoogleAuthProvider();

//set up your function for the google sign in
export function signInWithGoogle() {
  return (
    auth
      .signInWithRedirect(provider)
      // .getRedirectResult()
      .catch(function (error) {
        var errorCode = error.code;
      })
  );
}

//the logout function - removes cookies etc
export function logout() {
  return auth.signOut().then().catch(console.error);
}
