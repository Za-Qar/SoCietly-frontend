//React
import React, { useContext, createContext } from "react";

//Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, loading, error] = useAuthState(firebase.apps[0].auth());

  return (
    <AuthContext.Provider value={[authUser, loading, error]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
