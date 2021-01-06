//React
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

//Context
import { useAuthContext } from "../Context/authContext";
import { useUserContext } from "../Context/userContext";

//Component
import Loading from "../Components/Loading/loading";
import Signup from "../Pages/Signup/signup";

export default function UserSignIn({
  component: Component,
  path = "/",
  props,
  exact = false,
}) {
  const [authUser, loading, error] = useAuthContext();
  // user info returned from firebase - context

  const [userData, setUserData] = useState();
  // user data returned from backend

  const [userJourney, setJourney] = useState();
  // user journey data returned from backend

  const [user, setUser] = useUserContext();
  // user context set with firebase and backend data - context

  const [signup, setSignup] = useState();

  console.log(user);

  console.log(authUser);

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${authUser.email}`
        );
        console.log("fetch user");
        const data = await res.json();
        const payload = data.payload[0];

        payload ? setUserData(payload) : setSignup(true);
        // if data is null - set some not sign up to true
        // if not sign up is true redirect to sign up form
      }
    }
    !user && getUser();
    // checks if user context data has already been fetched from backend
  }, [authUser, user]);

  useEffect(() => {
    async function getUserJourney() {
      if (userData) {
        let res = await fetch(
          `https://falcon5ives.herokuapp.com/journeys/?id=${userData.id}`
        );
        console.log("fetch journey");
        let data = await res.json();
        console.log(data);
        setJourney(data.payload);
      }
    }
    !user && getUserJourney();
    // checks if user context data has already been fetched from backend
  }, [userData]);

  useEffect(() => {
    if (authUser && userData) {
      const newUser = {
        uid: userData.id,
        username: `${userData.name} ${userData.surname}`,
        name: userData.name,
        surname: userData.surname,
        email: authUser.email,
        profileImage: authUser.photoURL,
        lastSignIn: authUser.metadata.lastSignInTime,
        admin: userData.admin,
        cohort: userData.cohort,
        currentRole: userData.currentrole,
        currentEmployer: userData.currentemployer,
        skills: userData.skills,
        social: userData.social,
        introduction: userData.introduction,
        journey: userJourney,
      };
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
