import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import UserSignIn from "../Pages/SignInUser/signin";
import Homepage from "../Pages/Homepage/homepage";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <UserSignIn setUser={setUser} />
        </Route>
        <Route path="/">
          <Homepage user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
