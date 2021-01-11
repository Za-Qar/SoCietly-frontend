import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUserCircle, faHashtag } from "@fortawesome/free-solid-svg-icons";

import style from "./social.module.css";

export default function SocialLogo({ logo, link }) {
  switch (logo) {
    case "linkedin":
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faLinkedin} size={"2x"} />
          </a>
        </div>
      );
    case "github":
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faGithub} size={"2x"} />
          </a>
        </div>
      );
    case "twitter":
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faTwitter} size={"2x"} />
          </a>
        </div>
      );
    case "portfolio":
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faUserCircle} width={"30px"} size={"2x"} />
          </a>
        </div>
      );
    case "other":
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faHashtag} size={"2x"} />
          </a>
        </div>
      );
    default:
      return (
        <div className={style.socialLink}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            className={style.linkTag}
          >
            <FontAwesomeIcon icon={faUserCircle} size={"2x"} />
          </a>
        </div>
      );
  }
}
