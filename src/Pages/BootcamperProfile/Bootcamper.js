//Components
import UserInfo from "../../Components/UserInfo/userinfo";
import UserSkills from "../../Components/UserSkills/userskills";
import UserIntro from "../../Components/UserIntro/userintro";
import UserJourney from "../../Components/UserJourney/journey";

import { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";

export default function BootcamperProfilePage({ profile }) {
  const [bootcamper, setBootcamper] = useState();
  const [journey, setJourney] = useState();

  useEffect(() => {
    async function getUserJourney() {
      if (bootcamper) {
        let res = await fetch(
          `https://falcon5ives.herokuapp.com/journeys/?id=${profile.id}`
        );
        let data = await res.json();
        setJourney(data.payload);
      }
    }
    getUserJourney();
  }, [bootcamper]);

  useEffect(() => {
    async function getUser() {
      if (profile) {
        let res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${profile.email}`
        );
        let data = await res.json();
        const userData = data.payload[0];
        console.log(userData);
        const newUser = {
          uid: userData.id,
          username: `${userData.name} ${userData.surname}`,
          email: userData.email,
          profileImage: userData.profileimage,
          admin: userData.admin,
          cohort: userData.cohort,
          currentRole: userData.currentrole,
          currentEmployer: userData.currentemployer,
          skills: userData.skills,
          social: userData.social,
          introduction: userData.introduction,
          journey: journey ? journey : null,
        };

        setBootcamper(newUser);
      }
    }
    getUser();
  }, [journey]);

  return profile ? (
    <div>
      <h1>Profile Page</h1>
      {bootcamper && (
        <div>
          <UserInfo user={bootcamper} />
          <UserSkills user={bootcamper} />
          <UserIntro user={bootcamper} />
          <UserJourney user={bootcamper} />
        </div>
      )}
    </div>
  ) : (
    <Redirect to={"/"}></Redirect>
  );
}
