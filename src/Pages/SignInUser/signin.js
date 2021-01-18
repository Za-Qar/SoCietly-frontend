//React
import React from "react";
import { Redirect } from "react-router-dom";

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
  const [authUser, loading] = useAuthContext();

  function handleGoogle() {
    signInWithGoogle();
  }

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Redirect to={"/"}></Redirect>
  ) : (
    <div className={cn(style.backgroundImage)}>
      <div className={cn(style.row)}>
        <div className={cn(style.column)}>
          <div className={cn(style.container, style.moveBehind)}>
            <SignInSVG />
          </div>
        </div>
        <div className={cn(style.column)}>
          <div
            className={cn(
              style.container,
              style.shadowContainer,
              style.marginLeft
            )}
          >
            <div className={cn(style.content)}>
              <h1 className={cn(style.logoText)}> SoCietly</h1>
              <h3 className={cn(style.logoSubText)}> by SoC</h3>
              <br />
              <button onClick={handleGoogle} className={cn(style.buttonGoogle)}>
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{ marginRight: "7px" }}
                />{" "}
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
