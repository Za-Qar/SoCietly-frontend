import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../authContext";

//auth
import firebase from "firebase/app";
import { signInWithGoogle } from "../../Components/Firebase/auth";
import { logout } from "../../Components/Firebase/auth";

export default function UserSignIn({ setUser }) {
  const [authUser, loading, error] = useAuthContext();
  // console.log(authUser);

  // useEffect(() => {
  //   if (authUser) {
  //     const newUser = {
  //       username: authUser.displayName,
  //       uid: authUser.uid,
  //       email: authUser.email,
  //       image: authUser.photoURL,
  //       lastSignIn: authUser.metadata.lastSignInTime,
  //     };
  //     setUser(newUser);
  //   }
  // }, [authUser]);

  function handleGoogle() {
    signInWithGoogle();
  }

  if (loading) {
    return <p>LOADING!!</p>;
  }

  return authUser ? (
    <Redirect to={"/"}></Redirect>
  ) : (
    <div>
      <p>Hello random person</p>
      <button onClick={handleGoogle}>Log In</button>
    </div>
  );
}
