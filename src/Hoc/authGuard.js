import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import Loading from "../Components/Loading/loading";

export default function UserSignIn({
  component: Component,
  path = "/",
  exact = false,
}) {
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useState(null);
  console.log(authUser);

  useEffect(() => {
    if (authUser) {
      const newUser = {
        username: authUser.displayName,
        uid: authUser.uid,
        email: authUser.email,
        image: authUser.photoURL,
        lastSignIn: authUser.metadata.lastSignInTime,
      };
      setUser(newUser);
    }
  }, [authUser]);

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Route
      path={path}
      render={() => <Component user={user} setUser={setUser} />}
      exact={exact}
    ></Route>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
