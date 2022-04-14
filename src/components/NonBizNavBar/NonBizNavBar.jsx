import { NavLink } from "react-router-dom";
import "./NonBizNavBar.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowRightFromBracket,
  faCircleInfo,
  faPersonCirclePlus,
  faAddressCard,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const NonBizNavBar = () => {
  const history = useHistory();
  const dispach = useDispatch();

  const handleLogOut = () => {
    history.push("/login");
    dispach(authActions.logout());
    localStorage.clear();
  };

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
                className="nav-link active"
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
                className="nav-link active"
                aria-current="page"
                to="/aboutus"
                activeClassName="activeLink"
              >
                <FontAwesomeIcon icon={faPeopleGroup} />
                About Us
              </NavLink>
            </li>

            <button type="button" className="nav-item signBtn btn btn-danger">
              <NavLink
                className="nav-link active"
                aria-current="page"
                onClick={handleLogOut}
                to="/login"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Logout
              </NavLink>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NonBizNavBar;
