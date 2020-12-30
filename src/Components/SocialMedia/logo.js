import dev from "../../Images/DEV.png";
import fb from "../../Images/FB.png";
import insta from "../../Images/Insta.png";
import linkedin from "../../Images/LinkedIn.png";
import medium from "../../Images/Medium.png";
import soc from "../../Images/soc.png";
import twitter from "../../Images/Twitter.jpg";

export default function Logo({ logo }) {
  switch (logo) {
    case "dev":
      return <img src={dev} width="50" height="50" alt="DEV logo" />;
    case "fb":
      return <img src={fb} width="50" height="50" alt="Facebook logo" />;
    case "insta":
      return <img src={insta} width="50" height="50" alt="Instagram logo" />;
    case "linkedin":
      return <img src={linkedin} width="50" height="50" alt="LinkedIn logo" />;
    case "medium":
      return <img src={medium} width="50" height="50" alt="Medium logo" />;
    case "soc":
      return <img src={soc} width="50" height="50" alt="School of Code logo" />;
    case "twitter":
      return <img src={twitter} width="50" height="50" alt="Twitter logo" />;
    default:
      return null;
  }
}
