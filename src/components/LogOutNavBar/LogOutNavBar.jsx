import { NavLink } from "react-router-dom";
import "./LogOutNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";

const LogOutNavBar = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const biz = useSelector((state) => state.auth.biz);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand " to="/login">
          My Logo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                aria-current="page"
                to="/home"
                activeClassName="activeLink"
              >
                <FontAwesomeIcon icon={faDragon} />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/login"
                activeClassName="activeLink"
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                aria-current="page"
                to="/cardinfo"
                activeClassName="activeLink"
              >
                Card Info
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/register"
                activeClassName="activeLink"
              >
                Register
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                aria-current="page"
                to="/createcard"
                activeClassName="activeLink"
              >
                Create Card
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                aria-current="page"
                to="/aboutus"
                activeClassName="activeLink"
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LogOutNavBar;
