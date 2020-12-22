//components
import { logout } from "../../Components/Firebase/auth";

export default function Homepage({ user, setUser }) {
  function signOut() {
    logout();
    setUser(null);
  }

  console.log(user);

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
