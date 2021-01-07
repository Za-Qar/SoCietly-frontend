//styling
// import style from "./userImage.module.css";
import React, { useState, useEffect } from "react";
import "./userImage.css";

export default function UserImage({ user, width = "60px", onClick }) {
  const { profileimage, profileImage, name, cohort } = user;
  const [styling, setStyling] = useState(null);

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
      <img
        // class={styling}
        src={profileImage ? profileImage : profileimage}
        alt={`${name} profile`}
        width={width}
        onClick={onClick}
        className={`profImg ${styling}`}
      />
    </div>
  );
}
