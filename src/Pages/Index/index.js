//React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Hoc
import AuthGuard from "../../Hoc/authGuard";
import ProfilePage from "../Profile/profile";

//Pages
import SignIn from "../SignInUser/signin";
import Homepage from "../Homepage/homepage";
import Event from "../../Components/Event/event.js";
import Map from "../../Components/Maps/maps.js";
import MapTwo from "../../Components/Map/map.js";

//Components
import { user } from "../../Components/userData";

export default function Index() {
  return (
    <Router>
      <Switch>
        <AuthGuard component={Homepage} path={"/"} props={user} exact />
        <Route path="/login" component={SignIn}></Route>
        <AuthGuard
          component={ProfilePage}
          path={"/profile"}
          props={user}
          exact
        />

        <AuthGuard component={Event} path={"/event"} props={user} exact />
        <Route path="/event" component={SignIn}></Route>
        <AuthGuard
          component={ProfilePage}
          path={"/profile"}
          props={user}
          exact
        />

        <AuthGuard component={Map} path={"/map"} props={user} exact />
        <Route path="/event" component={SignIn}></Route>
        <AuthGuard
          component={ProfilePage}
          path={"/profile"}
          props={user}
          exact
        />

        <AuthGuard component={MapTwo} path={"/mapTwo"} props={user} exact />
        <Route path="/event" component={SignIn}></Route>
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
