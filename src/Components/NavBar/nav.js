import React, { useState } from "react";

//images
import socLogo from "../../Images/SoCietly_logo (2).svg";

//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./nav.module.css";
import "./burgerStyle.css";
import "./hamburger/dist/hamburgers.css";

//router
import {
  BrowserRouter as Link,
  NavLink,
} from "react-router-dom";

export default function NavBar() {
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
    <div className={style.navDiv}>
      <nav className={style.nav}>
        <div className="container">
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
                      src={socLogo}
                      alt="School of Code Logo"
                      height="100"
                      width="100"
                      onClick={changeHide}
                    />
                  </div>
                </NavLink>
              </li>

              {
                <div className="menuContainer">
                  {user && (
                    <Link to="/">
                      <li>
                        <span onClick={signOut}>Logout</span>
                      </li>
                    </Link>
                  )}
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

                  {/* <li onClick={changeHide}>
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/3601/3601082.svg"
                    className={style.cog}
                  />
                </li> */}
                </div>
              }
            </ul>
          </div>
        </div>
      </nav>
      <div className={`burgerContent ${hide}`}>
        <div className="topBurger">
          <Link to="/">
            <p onClick={changeHide}>Home</p>
          </Link>
        </div>
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
  ) : null;
}
