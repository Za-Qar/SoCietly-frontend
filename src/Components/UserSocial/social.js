//styling
import style from "./social.module.css";

//Component
import SocialLogo from "./socialLogo";

export default function SocialMedia({ social }) {
  return (
    social && (
      <div>
        <ul className={style.socialContainer}>
          {social.map((item) => {
            const newItem = JSON.parse(item);
            const [[social, link]] = Object.entries(newItem);

            return link && <SocialLogo logo={social} link={link} />;
          })}
        </ul>
      </div>
    )
  );
}
