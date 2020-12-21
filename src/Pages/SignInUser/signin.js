import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../authContext";
import Loading from "../Loading/loading";

//auth
import { signInWithGoogle } from "../../Components/Firebase/auth";

export default function UserSignIn({ setUser }) {
  const [authUser, loading, error] = useAuthContext();

  function handleGoogle() {
    signInWithGoogle();
  }

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Redirect to={"/"}></Redirect>
  ) : (
    <div>
      <h1>Sign In</h1>
      <p>Hello random person</p>
      <button onClick={handleGoogle}>Log In</button>
    </div>
  );
}
