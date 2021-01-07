import React, { useState, useEffect } from "react";

//
import { Link } from "react-router-dom";
//

import style from "./alumni.module.css";

import UserInfo from "../../Components/UserInfo/userinfo";

//
import UserIntro from "../../Components/UserIntro/userintro";

import UserImage from "../../Components/userImage/userImage";

//
import { useProfileContext } from "../../Context/profileContext";
//

export default function GetAllAlumni() {
  const [allAlumni, setAllAlumni] = useState([]);

  //
  const [profile, setProfile] = useProfileContext();
  //

  async function getUserInfo() {
    let res = await fetch("https://falcon5ives.herokuapp.com/users");
    let data = await res.json();
    console.log(data);
    setAllAlumni(data.payload);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h3>Alumni</h3>
      {allAlumni &&
        allAlumni.map((item, index) => {
          return (
            <div>
              {/* <UserImage user={item} /> */}
              <UserInfo link={item} key={index} user={item} />
            </div>
          );
        })}
    </div>
  );
}
