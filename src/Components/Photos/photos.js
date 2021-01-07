//staff images
import ben from "../../Images/ben_headshot.jpg";
import chris from "../../Images/chris_headshot.jpg";
import james from "../../Images/james_headshot.jpg";
import kyle from "../../Images/kyle_headshot.jpeg";
import liz from "../../Images/liz_headshot.jpg";
import lizzie from "../../Images/lizzie_headshot.jpg";
import patrick from "../../Images/patrick_headshot.jpg";
import soc from "../../Images/soc_headshot.png";
import tao from "../../Images/tao_headshot.jpg";
import tim from "../../Images/tim_headshot.png";

//styling
import style from "./photos.module.css";

export default function Photo({ photo }) {
  switch (photo) {
    case "ben":
      return <img src={ben} width="150" height="150" alt="Ben Lee" />;
    case "chris":
      return <img src={chris} width="150" height="150" alt="Chris Meah" />;
    case "james":
      return <img src={james} width="150" height="150" alt="James Greygoose" />;
    case "kyle":
      return <img src={kyle} width="150" height="150" alt="Kyle Semple" />;
    case "liz":
      return <img src={liz} width="150" height="150" alt="Liz Kaufman" />;
    case "lizzie":
      return <img src={lizzie} width="150" height="150" alt="Liz Edrop" />;
    case "patrick":
      return <img src={patrick} width="150" height="150" alt="Patrick Young" />;
    case "soc":
      return <img src={soc} width="300" height="180" alt="SoC Team" />;
    case "tao":
      return <img src={tao} width="150" height="150" alt="Tao Sharma" />;
    case "tim":
      return <img src={tim} width="150" height="150" alt="Tim Knight" />;
    default:
      return null;
  }
}
