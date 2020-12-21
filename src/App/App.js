import "./App.css";
import { useState } from "react";

import UserSignIn from "../Pages/SignInUser/signin";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  return <UserSignIn setUser={setUser} />;
}

export default App;
