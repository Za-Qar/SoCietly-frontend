//components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserImage from "../../Components/userImage/userImage";
import JobUpdates from "../../Components/jobUpdates/jobUpdates";

//Context
import { useUserContext } from "../../Context/userContext";

export default function Homepage() {
  const [user, setUser] = useUserContext();

  return (
    user && (
      <div>
        <h1>Homepage</h1>
        <UserImage user={user} />
        <UserInfo user={user} />
        <JobUpdates />
      </div>
    )
  );
}
