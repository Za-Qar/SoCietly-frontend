//React
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

//Context
import { useAuthContext } from "../Context/authContext";
import { useUserContext } from "../Context/userContext";

//Component
import Loading from "../Components/Loading/loading";
import Signup from "../Components/Signup/signup";

// Helpers
import fetchData from "../Helpers/fetch";
import createUserObj from "../Helpers/createUserObj";

export default function UserSignIn({
  component: Component,
  path = "/",
  props,
  exact = false,
}) {
  const [authUser, loading] = useAuthContext();
  // user info returned from firebase - context

  const [userData, setUserData] = useState();
  // user data returned from backend

  const [userJourney, setJourney] = useState();
  // user journey data returned from backend

  const [user, setUser] = useUserContext();
  // user context set with firebase and backend data - context

  const [signup, setSignup] = useState();

  console.log(authUser);

  console.log(user);

  console.log(userData);

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const userPath = `/users/?email=${authUser.email}`;
        console.log(userPath);
        const data = await fetchData(userPath);
        console.log(data);
        const payload = data.payload[0];
        console.log(payload);
        // if data is null - set some not sign up to true
        // if not sign up is true redirect to sign up form
        payload ? setUserData(payload) : setSignup(true);
      }
    }
    // checks if user context data has already been fetched from backend
    !user && getUser();
  }, [authUser, user]);

  useEffect(() => {
    async function getUserJourney() {
      if (userData) {
        const journeyPath = `/journeys/?id=${userData.id}`;
        const data = await fetchData(journeyPath);
        setJourney(data.payload);
      }
    }
    // checks if user context data has already been fetched from backend
    !user && getUserJourney();
  }, [userData]);

  useEffect(() => {
    if (authUser && userData) {
      const newUser = createUserObj(authUser, userData, userJourney);
      setUser(newUser);
    }
  }, [authUser, userData, userJourney]);

  if (loading) {
    return <Loading />;
  }

  if (signup) {
    return <Signup signup={signup} setSignup={setSignup} />;
  }

  return authUser ? (
    <Route path={path} render={() => <Component />} exact={exact}></Route>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
