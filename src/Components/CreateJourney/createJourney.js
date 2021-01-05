//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Auth
import { signInWithGoogle, logout } from "../../Components/Firebase/auth";

//Components
import Loading from "../../Components/Loading/loading";

export default function CreateJourney() {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();
  const [waiting, setWaiting] = useState(true);

  console.log(user);

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${authUser.email}`
        );
        console.log(authUser.email);
        console.log("fetch");
        const data = await res.json();

        const payload = data.payload[0];
        setUser(payload);
        // if data is null - set some not sign up to true
        // if not sign up is true redirect to sign up form
      }
    }
    !user && getUser();
    // checks if user context data has already been fetched from backend
  }, [authUser, waiting]);

  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
      console.log("timeout complete");
    }, 3000);
  }, []);

  function createJourney() {
    // fetch(`https://falcon5ives.herokuapp.com/users`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     admin: admin,
    //     name: name,
    //     surname: surname,
    //     email: email,
    //     profileImage: authUser.photoURL,
    //     cohort: cohort,
    //     currentRole: currentRole,
    //     currentEmployer: currentEmployer,
    //     skills: skills,
    //     introduction: introduction,
    //     social: socialArray,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("this is the user data: ", data))
    //   .catch((error) => console.log("user creation error error: ", error));
  }

  if (waiting) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Create Journey</h2>
      <form>
        <input name="name" ref={register} required />
      </form>
    </div>
  );
}
