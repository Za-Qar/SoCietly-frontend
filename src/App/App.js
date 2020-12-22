import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import UserSignIn from "../Pages/SignInUser/signin";
import Homepage from "../Pages/Homepage/homepage";

function App({ user, setUser }) {
  console.log(user);
  return <Homepage user={user} setUser={setUser} />;
}

export default App;
