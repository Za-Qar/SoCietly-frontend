import { Redirect } from "react-router-dom";

//components
import { logout } from "../../Components/Firebase/auth";

export default function Homepage({ user, setUser }) {
  function signOut() {
    logout();
    setUser(null);
    return <Redirect to="/login"></Redirect>;
  }
  return user ? (
    ((<p>{user.username}</p>), (<button onClick={signOut}>Log Out</button>))
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
