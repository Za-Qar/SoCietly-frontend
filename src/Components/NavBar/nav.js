import React, { useState } from "react";

//images
import soc from "../../Images/soc.png";

//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./nav.module.css";
import "./burgerStyle.css";

//router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useUserContext();
  const [hide, setHide] = useState("hide");

  function signOut() {
    logout();
    setUser(null);
  }

  function hideClass() {
    hide === "hide" ? setHide("") : setHide("hide");
  }

  return (
    <div className={style.navDiv}>
      <nav className={style.nav}>
        <div className="container">
          <Link to="/"></Link>
          {/* Search Bar */}
          <div className={style.navContainer}>
            <ul>
              <li>
                <img
                  className={style.img}
                  src={soc}
                  alt="School of Code Logo"
                  height="100"
                  width="100"
                />
              </li>
              <Link to="/">
                <li>
                  <span>Home</span>
                </li>
              </Link>
              <Link to="/events">
                <li>
                  <span>Events</span>
                </li>
              </Link>
              <Link to="/profile">
                <li>
                  <span>Profile</span>
                </li>
              </Link>
              <Link to="/alumni">
                <li>
                  <span>Alumni</span>
                </li>
              </Link>
              <Link to="/contact">
                <li>
                  <span>Contact</span>
                </li>
              </Link>
              <li onClick={hideClass}>
                <img
                  className={style.cog}
                  src="https://www.flaticon.com/svg/static/icons/svg/3601/3601082.svg"
                />
              </li>

              {user && (
                <li className="links" onClick={signOut}>
                  <span>Log Out</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className={`burgerContent ${hide}`}>
        <p>Hello </p>
        <p>Hello </p>
        <p>Hello </p>
        <p>Hello </p>
      </div>
    </div>
  );
}
