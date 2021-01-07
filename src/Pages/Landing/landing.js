//styling
import style from "./landing.module.css";

//pictures
import one from "../../Images/1.png";
import two from "../../Images/2.jpg";
import three from "../../Images/3.jpg";
import four from "../../Images/4.jpg";
import five from "../../Images/5.jpg";

export default function Landing() {
  return (
    <div classname={style.bg}>
      <div className={style.img1}>
        <img src={one} />
      </div>
      <div className={style.img2}>
        <img src={two} />
      </div>
      <div className={style.img3}>
        <img src={three} />
      </div>
      <div className={style.img4}>
        <img src={four} />
      </div>
      <div className={style.img5}>
        <img src={five} />
      </div>

      <div className={style.text}>
        <h4>Societly</h4>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
        <p>school of code stuff</p>
      </div>
    </div>
  );
}
