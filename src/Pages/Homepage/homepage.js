//components
import { logout } from "../../Components/Firebase/auth";

export default function Homepage({ user, setUser }) {
  function signOut() {
    logout();
    setUser(null);
  }

  console.log(user);

  return (
    <div>
      <p>Homepage</p>
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}
