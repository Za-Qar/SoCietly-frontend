//staff images
import ben from "../../Images/ben_headshot.jpg";
import chris from "../../Images/chris_headshot.jpg";
import liz from "../../Images/liz_headshot.jpg";
import lizzie from "../../Images/lizzie_headshot.jpg";
import tao from "../../Images/tao_headshot.jpg";

export default function Photo({ photo }) {
  switch (photo) {
    case "ben":
      return <img src={ben} width="150" height="150" alt="Ben Lee" />;
    case "chris":
      return <img src={chris} width="150" height="150" alt="Chris Meah" />;
    case "liz":
      return <img src={liz} width="150" height="150" alt="Liz Kaufman" />;
    case "lizzie":
      return <img src={lizzie} width="150" height="150" alt="Liz Edrop" />;
    case "tao":
      return <img src={tao} width="150" height="150" alt="Tao Sharma" />;
    default:
      return null;
  }
}
