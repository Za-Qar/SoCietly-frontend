//React
import React from "react";
import { Redirect, Link } from "react-router-dom";

//Context
import { useAuthContext } from "../../Context/authContext";

//Auth
import { signInWithGoogle } from "../../Components/Firebase/auth";

//Components
import Loading from "../../Components/Loading/loading";

//styling
import style from "./signIn.module.css";

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
      <h1>Sign up or Login</h1>

      <button onClick={handleGoogle}>Continue with Google</button>
    </div>
  );
}
