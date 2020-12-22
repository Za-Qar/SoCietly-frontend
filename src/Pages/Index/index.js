//React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Pages
import App from "../../App/App";
import SignIn from "../SignInUser/signin";
import Homepage from "../Homepage/homepage";

//Hoc
import AuthGuard from "../../Hoc/authGuard";

export default function Index() {
  return (
    <Router>
      <Switch>
        <AuthGuard component={Homepage} path={"/"} exact />
        <Route path="/login" component={SignIn}></Route>
      </Switch>
    </Router>
  );
}
