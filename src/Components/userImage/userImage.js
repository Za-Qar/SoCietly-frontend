//styling
import style from "./userImage.module.css";
import React, { useState, useEffect } from "react";

export default function UserImage({ user }) {
  const { profileImage, name, cohort } = user;
  const [styling, setStyling] = useState(null);

  function styleCohort() {
    if (cohort === 1) {
      setStyling(style.cohort1);
    } else if (cohort === 2) {
      setStyling(style.cohort2);
    } else if (cohort === 3) {
      setStyling(style.cohort3);
    } else if (cohort === 4) {
      setStyling(style.cohort4);
    } else if (cohort === 5) {
      setStyling(style.cohort5);
    }
  }

  useEffect(() => {
    styleCohort();
  }, []);

  return (
    <div>
      <img class={styling} src={profileImage} alt={`${name} profile`} />
    </div>
  );
}
