//React
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

//Context
import { useAuthContext } from "../Context/authContext";
import { useUserContext } from "../Context/userContext";

//Component
import Loading from "../Components/Loading/loading";

export default function UserSignIn({
  component: Component,
  path = "/",
  props,
  exact = false,
}) {
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();

  console.log(props);

  useEffect(() => {
    if (authUser) {
      const newUser = {
        uid: props.uid,
        username: authUser.displayName,
        email: authUser.email,
        profileImage: authUser.photoURL,
        lastSignIn: authUser.metadata.lastSignInTime,
        admin: props.admin,
        cohort: props.cohort,
        currentRole: props.currentRole,
        currentEmployer: props.currentEmployer,
        skills: props.skills,
        introduction: props.introduction,
        journey: props.journey,
      };
      setUser(newUser);
    }
  }, [authUser]);

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Route path={path} render={() => <Component />} exact={exact}></Route>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
