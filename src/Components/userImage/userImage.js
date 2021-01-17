//styling
// import style from "./userImage.module.css";
import React, { useState, useEffect } from "react";
import "./userImage.css";

//Link
import { Link } from "react-router-dom";

// Styling
import style from "./userImage.module.css";
import cn from "classnames";

export default function UserImage({ user, width = "60px", centre }) {
  const { profileimage, profileImage, name, cohort, id, uid } = user;
  const [styling, setStyling] = useState(null);
  const [cohortNumber, setCohortNumber] = useState(null);

  console.log("this is userImage: ", user);

  function styleCohort() {
    if (cohort === 1) {
      setStyling("cohort1");
      setCohortNumber(1);
    } else if (cohort === 2) {
      setStyling("cohort2");
      setCohortNumber(2);
    } else if (cohort === 3) {
      setStyling("cohort3");
      setCohortNumber(3);
    } else if (cohort === 4) {
      setStyling("cohort4");
      setCohortNumber(4);
    } else if (cohort === 5) {
      setStyling("cohort5");
      setCohortNumber(5);
    }
  }

  useEffect(() => {
    styleCohort();
  }, []);

  return (
    <div
      style={{ width: `${width}` }}
      className={cn(style.image, centre && style.imageMargin)}
    >
      <Link to={`/bootcamper/${id ? id : uid}`}>
        <img
          class={styling}
          src={profileImage ? profileImage : profileimage}
          alt={`${name} profile`}
          width={width}
          className={`profImg ${styling}`}
        />
      </Link>
      <div className={cn(style.cohort, styling)}>{cohortNumber}</div>
    </div>
  );
}
