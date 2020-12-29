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

  const [userData, setUserData] = useState();

  console.log({ userData });
  console.log({ authUser });
  console.log({ user });

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        let res = await fetch(
          `http://localhost:3000/user/email/${authUser.email}`
        );
        let data = await res.json();
        setUserData(data.payload[0]);
      }
    }
    getUser();
  }, [authUser]);

  // async function getUser() {
  //   if (authUser) {
  //     let res = await fetch(
  //       `http://localhost:3000/user/email/${authUser.email}`
  //     );
  //     let data = await res.json();
  //     setUserData(data.payload[0]);

  //     const newUser = {
  //       uid: userData.id,
  //       username: userData.name,
  //       email: authUser.email,
  //       profileImage: authUser.photoURL,
  //       lastSignIn: authUser.metadata.lastSignInTime,
  //       admin: userData.admin,
  //       cohort: userData.cohort,
  //       currentRole: userData.currentrole,
  //       currentEmployer: userData.currentemployer,
  //       skills: userData.skills,
  //       introduction: userData.introduction,
  //       journey: props.journey,
  //     };
  //     setUser(newUser);
  //   }
  // }

  function logging() {
    console.log("it is logging");
    console.log(userData);
  }

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
        introduction: userData.introduction,
        journey: props.journey,
      };
      setUser(newUser);
    }
  }, [authUser && userData]);

  if (loading) {
    return <Loading />;
  }

  return authUser ? (
    <Route path={path} render={() => <Component />} exact={exact}></Route>
  ) : (
    <Redirect to={"/login"}></Redirect>
  );

  // return <button onClick={logging}>Click to log user</button>;
}

// //React
// import React, { useEffect, useState } from "react";
// import { Redirect, Route } from "react-router-dom";

// //Context
// import { useAuthContext } from "../Context/authContext";
// import { useUserContext } from "../Context/userContext";

// //Component
// import Loading from "../Components/Loading/loading";

// export default function UserSignIn({
//   component: Component,
//   path = "/",
//   props,
//   exact = false,
// }) {
//   const [authUser, loading, error] = useAuthContext();
//   const [user, setUser] = useUserContext();

//   useEffect(() => {
//     if (authUser) {
//       const newUser = {
//         uid: props.uid,
//         username: authUser.displayName,
//         email: authUser.email,
//         profileImage: authUser.photoURL,
//         lastSignIn: authUser.metadata.lastSignInTime,
//         admin: props.admin,
//         cohort: props.cohort,
//         currentRole: props.currentRole,
//         currentEmployer: props.currentEmployer,
//         skills: props.skills,
//         introduction: props.introduction,
//         journey: props.journey,
//       };
//       setUser(newUser);
//     }
//   }, [authUser]);

//   if (loading) {
//     return <Loading />;
//   }

//   return authUser ? (
//     <Route path={path} render={() => <Component />} exact={exact}></Route>
//   ) : (
//     <Redirect to={"/login"}></Redirect>
//   );
// }
