import { NavLink } from "react-router-dom";
import "./LogOutNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightToBracket,
  faCircleInfo,
  faPersonCirclePlus,
  faAddressCard,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const LogOutNavBar = () => {
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
                <FontAwesomeIcon icon={faHome} />
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                aria-current="page"
                to="/cardinfo"
                activeClassName="activeLink"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
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
                <FontAwesomeIcon icon={faPersonCirclePlus} />
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
                <FontAwesomeIcon icon={faAddressCard} />
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
                <FontAwesomeIcon icon={faPeopleGroup} />
                About Us
              </NavLink>
            </li>
            <li className="nav-item signBtn">
              <button type="button" className="nav-item btn btn-primary">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  Login
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LogOutNavBar;
