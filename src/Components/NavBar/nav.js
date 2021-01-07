//images
import soc from "../../Images/soc.png";

//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./nav.module.css";

//router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useUserContext();

  function signOut() {
    logout();
    setUser(null);
  }
  return (
    <div>
      <Link to="/">
        <img src={soc} alt="School of Code Logo" height="100" width="100" />
      </Link>
      {/* Search Bar */}

      {user && (
        <ul>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/events">
            <button>Events</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <Link to="/alumni">
            <button>Alumni</button>
          </Link>
          <Link to="/contact">
            <button>Contact</button>
          </Link>
          <Link to="/resources">
            <button>Resources</button>
          </Link>

          {
            <button className="links" onClick={signOut}>
              Log Out
            </button>
          }
        </ul>
      )}
    </div>
  );
}
