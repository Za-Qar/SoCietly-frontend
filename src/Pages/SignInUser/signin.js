import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

//auth
import firebase from "firebase/app";
import { signInWithGoogle } from "../../Components/Firebase/auth";
import { logout } from "../../Components/Firebase/auth";

export default function UserSignIn({ setUser }) {
  const [authUser, loading, error] = useAuthState(firebase.apps[0].auth());
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

  function handleGoogle() {
    signInWithGoogle();
  }

  return (
    <div>
      {!authUser && !loading && <p>Hello random person</p>}
      {!authUser && !loading && <button onClick={handleGoogle}>Log In</button>}

      {authUser && <p>Hello {authUser.displayName}</p>}
      {authUser && <button onClick={logout}>Log Out</button>}

      {loading && <p>LOADING!!</p>}

      {error && <p>Error!</p>}
    </div>
  );
}
