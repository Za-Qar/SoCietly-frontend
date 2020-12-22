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
      <h2>Hello random person</h2>
      <h3>Hello random person</h3>
      <h4>Hello random person</h4>
      <h5>Hello random person</h5>
      <h6>Hello random person</h6>
      <p>Hello random person</p>
      <button onClick={handleGoogle}>Log In</button>
    </div>
  );
}