//React
import React from "react";
import { Redirect } from "react-router-dom";

//Context
import { useAuthContext } from "../../Context/authContext";

//Auth
import { signInWithGoogle } from "../../Components/Firebase/auth";

//Components
import Loading from "../../Components/Loading/loading";

export default function UserSignIn() {
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
