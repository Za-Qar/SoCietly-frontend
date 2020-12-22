//Components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserSkills from "../../Components/UserSkills/userskills";
import UserIntro from "../../Components/UserIntro/userintro";

export default function ProfilePage({ props }) {
  return (
    <div>
      <UserInfo user={props} />;
      <UserSkills user={props} />;
      <UserIntro user={props} />
    </div>
  );
}
