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
  // user info returned from firebase - context

  const [userData, setUserData] = useState();
  // user data returned from backend

  const [userJourney, setJourney] = useState();
  // user journey data returned from backend

  const [user, setUser] = useUserContext();
  // user context set with firebase and backend data - context

  console.log(user);

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        let res = await fetch(
          `http://localhost:3000/users/?email=${authUser.email}`
        );
        let data = await res.json();
        setUserData(data.payload[0]);
      }
    }
    getUser();
  }, [authUser]);

  useEffect(() => {
    async function getUserJourney() {
      if (userData) {
        let res = await fetch(
          `http://localhost:3000/journeys/?id=${userData.id}`
        );
        let data = await res.json();
        setJourney(data.payload);
      }
    }
    getUserJourney();
  }, [userData]);

  useEffect(() => {
    if (authUser && userData) {
      const newUser = {
        uid: userData.id,
        username: userData.name,
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
  }, [authUser && userData && userJourney]);

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Route path={path} render={() => <Component />} exact={exact}></Route>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );
}
