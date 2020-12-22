//Components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserSkills from "../../Components/UserSkills/userskills";
import UserIntro from "../../Components/UserIntro/userintro";
import UserJourney from "../../Components/UserJourney/journey";
import { useUserContext } from "../../Context/userContext";

export default function ProfilePage() {
  const [user] = useUserContext();

  return (
    user && (
      <div>
        <UserInfo user={user} />
        <UserSkills user={user} />
        <UserIntro user={user} />
        <UserJourney user={user} />
      </div>
    )
  );
}
