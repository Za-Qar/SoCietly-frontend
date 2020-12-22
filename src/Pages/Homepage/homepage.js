//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

export default function Homepage() {
  const [user, setUser] = useUserContext();

  function signOut() {
    logout();
    setUser(null);
  }

  return (
    user && (
      <div>
        <h1>Homepage</h1>
        <p>Hello {user.username}</p>
        <button onClick={signOut}>Log Out</button>
      </div>
    )
  );
}
