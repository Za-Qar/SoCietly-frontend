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
import cn from "classnames";
import SignInSVG from "./background";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
    <div className={cn(style.row)}>
      <SignInSVG />
      <div className={cn(style.column)}>
        <div className={cn(style.container)}>
          <div className={cn(style.content)}>
            <h1>Societly</h1>
            <h2>Sign up or Login</h2>
            <button onClick={handleGoogle} className={cn(style.buttonGoogle)}>
              <FontAwesomeIcon icon={faGoogle} /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
