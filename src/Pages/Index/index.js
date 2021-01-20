//React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Hoc
import AuthGuard from "../../Hoc/authGuard";
import ProfilePage from "../Profile/profile";

//Pages
import SignIn from "../SignInUser/signin";
import Homepage from "../Homepage/homepage";
import CreateEvent from "../CreateEvent/createEvent.js";
import GetAllEvents from "../Events/events.js";
import Resources from "../Resources/resources.js";
import Contact from "../Contact/contact";
import Alumni from "../Alumni/Alumni";
import MyEvents from "../../Pages/MyEvents/myEvents.js";

//Components
import { user } from "../../Components/userData";
import NavBar from "../../Components/NavBar/nav";
import CloudinaryImage from "../../Components/CloudinaryImage/cloudinaryImage.js";
import EventPage from "../../Pages/EvenPage/EventPage.js";
import Loading from "../../Components/Loading/loading";
import SiteLogo from "../../Components/Logo/logo";
import ReactUploadImage from "../../Components/Upload/upload.js";

//Material Ui
import Tags from "../../MaterialUi/tags/tags.js";

export default function Index() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <AuthGuard component={Homepage} path={"/"} props={user} exact />
        <Route path="/login" component={SignIn}></Route>
        <AuthGuard component={ProfilePage} path={"/bootcamper/:id"} />
        <AuthGuard
          component={CreateEvent}
          path={"/CreateEvent"}
          props={user}
          exact
        />
        <AuthGuard
          component={GetAllEvents}
          path={"/events"}
          props={user}
          exact
        />
        <AuthGuard
          component={GetAllEvents}
          path={"/events/:id"}
          props={user}
          exact
        />

        <Route path={"/loading"} exact>
          <Loading />
        </Route>

        <Route path={"/logo"} exact>
          <SiteLogo />
        </Route>
        <AuthGuard
          component={EventPage}
          path={"/event/:id"}
          props={user}
          exact
        />

        <AuthGuard component={Contact} path={"/contact"} exact />

        <AuthGuard component={ReactUploadImage} path={"/uploadimage"} exact />

        <AuthGuard component={CloudinaryImage} path={"/image"} exact />

        <AuthGuard component={MyEvents} path={"/myevents"} exact />

        <AuthGuard component={Alumni} path={"/alumni"} exact />

        <AuthGuard component={Tags} path={"/card"} exact />

        <AuthGuard
          component={Resources}
          path={"/resources"}
          props={user}
          exact
        />

        {/* For Development Purposes */}

        {/* <AuthGuard component={MapTwo} path={"/mapTwo"} props={user} exact /> */}
      </Switch>
    </Router>
  );
}
