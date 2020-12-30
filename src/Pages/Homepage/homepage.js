//components
// import { logout } from "../../Components/Firebase/auth";
import UserInfo from "../../Components/UserInfo/userinfo";
import UserImage from "../../Components/userImage/userImage";
import JobUpdates from "../../Components/jobUpdates/jobUpdates";

//Context
import { useUserContext } from "../../Context/userContext";

export default function Homepage() {
  const [user, setUser] = useUserContext();

  // function signOut() {
  //   logout();
  //   setUser(null);
  // }

  return (
    user && (
      <div>
        <h1>Homepage</h1>
        {/* <button onClick={signOut}>Log Out</button> */}
        <UserImage user={user} />
        <UserInfo user={user} />
        <JobUpdates />
      </div>
    )
  );
}
