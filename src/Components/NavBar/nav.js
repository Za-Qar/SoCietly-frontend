//images
import soc from "../../Images/soc.png";

//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

export default function NavBar() {
  const [user, setUser] = useUserContext();

  function signOut() {
    logout();
    setUser(null);
  }
  return (
    <div>
      <a href="http://localhost:3000/">
        <img src={soc} alt="School of Code Logo" height="100" width="100" />
      </a>
      {/* Search Bar */}
      <ul>
        <a href="http://localhost:3000/" className="links">
          <button>Home</button>
        </a>
        <a href="http://localhost:3000/events" className="links">
          <button>Events</button>
        </a>
        <a href="http://localhost:3000/profile" className="links">
          <button>Profile</button>
        </a>
        <a href="http://localhost:3000/alumni" className="links">
          <button>Alumni</button>
        </a>
        <a href="http://localhost:3000/contact" className="links">
          <button>Contact</button>
        </a>
        <a href="http://localhost:3000/contact" className="links">
          <button onClick={signOut}>Log Out</button>
        </a>
      </ul>
    </div>
  );
}
