import React, { useState } from "react";

//images
import soc from "../../Images/soc.png";
import logo from "../../Images/logo.png";
import socLogo from "../../Images/SoCietly_logo (2).svg";

//components
import { logout } from "../Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./nav.module.css";
import "./burgerStyle.css";
import "./hamburger/dist/hamburgers.css";

//router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import SiteLogo from "../Logo/logo";

export default function NavBar2() {
  const [user, setUser] = useUserContext();
  const [hide, setHide] = useState("hide");
  const [burger, setBurger] = useState("");
  const [hideCog, setHideCog] = useState("hide");

  function signOut() {
    logout();
    setUser(null);
  }

  function changeBurger() {
    burger === "" ? setBurger("is-active") : setBurger("");
    hide === "hide" ? setHide("") : setHide("hide");

    hideCog === "hide" ? setHideCog("hide") : setHideCog("hide");
  }

  function changeHide() {
    hideCog === "hide" ? setHideCog("") : setHideCog("hide");

    burger === "is-active" ? setBurger("") : setBurger("");
    hide === "hide" ? setHide("hide") : setHide("hide");
  }

  return user ? (
    <div>
      <div className={style.navDiv}>
        <nav className={style.nav}>
          <div className={style.container}>
            {/* Search Bar */}
            <div className={style.navContainer}>
              <ul>
                <li>
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none" }}
                    activeStyle={{ textDecoration: "none", color: "black" }}
                  >
                    <div className={style.logoDiv}>
                      <img
                        className={style.img}
                        src={soc}
                        alt="School of Code Logo"
                      />
                    </div>
                  </NavLink>
                </li>

                <div className={style.menuContainerLeft}>
                  {user && (
                    <Link to="/">
                      <li>
                        <span onClick={signOut}>Menu</span>
                      </li>
                      <li>
                        <span onClick={signOut}>Home</span>
                      </li>
                    </Link>
                  )}
                </div>

                <div className={style.menuContainerRight}>
                  <button
                    class={`hamburger hamburger--spring ${burger} cog`}
                    type="button"
                    onClick={changeBurger}
                    style={{ outline: "none" }}
                  >
                    <span class="hamburger-box ">
                      <span class="hamburger-inner"></span>
                    </span>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <div className={`burgerContent ${hide}`}>
          <Link to="/">
            <p onClick={changeHide}>Home</p>
          </Link>
          <Link to="/events">
            <p onClick={changeHide}>Events</p>
          </Link>
          {user && (
            <Link to={`/bootcamper/${user.uid ? user.uid : user.id}`}>
              <p onClick={changeHide}>Profile</p>
            </Link>
          )}
          <Link to="/alumni">
            <p onClick={changeHide}>Alumni</p>
          </Link>
          <Link to="/resources">
            <p onClick={changeHide}>Resources</p>
          </Link>
          <Link to="/contact">
            <p onClick={changeHide}>Contact</p>
          </Link>
        </div>
        <div className={`burgerContent ${hideCog}`}></div>
      </div>

      <div className={style.container}>
        <div className={style.content}>
          <div className={style.contentImg}>
            <img width="100%" />
          </div>
          <p>Stuff comes here</p>
        </div>
      </div>
    </div>
  ) : null;
}
