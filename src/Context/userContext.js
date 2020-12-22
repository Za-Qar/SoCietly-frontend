//React
import { useContext, createContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // User Object
  // name, profileImage, email - from firebase
  //   {
  //     "admin":"true",
  //     "name":"Wade",
  //     "email":"wade_wildson@gmail.com",
  //     "profileImage":"wtv.jpeg",
  //     "cohort":"4",
  //     "currentRole":"camper",
  //     "currentEmployer":"soc",
  //     "skills":"nox",
  //     "introduction":"intro stuff comes here"
  // }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
