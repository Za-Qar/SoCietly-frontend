//components
import Intro from "../../Components/Intro/intro";

//styling
import style from "./contact.module.css";

export default function Contact() {
  return (
    <div>
      <div className={style.welcome}>
        <h3>Resources</h3>
        <h4>Check out these helpful links!</h4>
      </div>
      <div className={style.contacts}>
        <Intro name="soc" />
        <br />
        <Intro name="chris" />
        <br />
        <Intro name="lucyrose" />
        <br />
        <Intro name="devon" />
        <br />
        <Intro name="ben" />
        <br />
        <Intro name="tim" />
        <br />
        <Intro name="liz" />
        <br />
        <Intro name="tao" />
        <br />
        <Intro name="james" />
        <br />
        <Intro name="lizzie" />
        <br />
        <Intro name="kyle" />
        <br />
        <Intro name="patrick" />
      </div>
    </div>
  );
}
