//styling
// import style from "./userImage.module.css";
import React, { useState, useEffect } from "react";
import "./userImage.css";

//Link
import { Link } from "react-router-dom";

export default function UserImage({ user, width = "60px" }) {
  const { profileimage, profileImage, name, cohort, id, uid } = user;
  const [styling, setStyling] = useState(null);

  console.log("this is userImage: ", user);

  function styleCohort() {
    if (cohort === 1) {
      setStyling("cohort1");
    } else if (cohort === 2) {
      setStyling("cohort2");
    } else if (cohort === 3) {
      setStyling("cohort3");
    } else if (cohort === 4) {
      setStyling("cohort4");
    } else if (cohort === 5) {
      setStyling("cohort5");
    }
  }

  useEffect(() => {
    styleCohort();
  }, []);

  return (
    <div>
      <Link to={`/bootcamper/${id ? id : uid}`}>
        <img
          class={styling}
          src={profileImage ? profileImage : profileimage}
          alt={`${name} profile`}
          width={width}
          className={`profImg ${styling}`}
        />
      </Link>
    </div>
  );
}
