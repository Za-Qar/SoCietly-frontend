//React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Hoc
import AuthGuard from "../../Hoc/authGuard";
import ProfilePage from "../Profile/profile";

//Pages
import App from "../../App/App";
import SignIn from "../SignInUser/signin";

//Components
import { user } from "../../Components/userData";

export default function Index() {
  return (
    <Router>
      <Switch>
        <AuthGuard component={App} path={"/"} exact />
        <Route path="/login" component={SignIn}></Route>
        <AuthGuard
          component={ProfilePage}
          path={"/profile"}
          props={user}
          exact
        />
      </Switch>
    </Router>
  );
}
