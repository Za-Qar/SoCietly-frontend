import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "../../App/App";
import SignIn from "../SignInUser/signin";
import AuthGuard from "../../Hoc/authGuard";

export default function Index() {
  return (
    <Router>
      <Switch>
        <AuthGuard component={App} path={"/"} exact />
        <Route path="/login" component={SignIn}></Route>
      </Switch>
    </Router>
  );
}
