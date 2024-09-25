import { Fragment } from "react";
import { getRole, getName } from "../../../services/AuthService";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Header.css";

export const Header = () => {
  const auth = useAuth();

  return (
    <Fragment>
      <nav className="navbar-top">
        <ul className="navbar-links">
          {auth.getLoggedIn() && (
            <li>
              <NavLink
                to="forum"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Forum
              </NavLink>
            </li>
          )}
          {!auth.getLoggedIn() && (
            <Fragment>
              <li>
                <NavLink
                  to="login"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
          {auth.getLoggedIn() &&
            (getRole() === "Moderator" ||
              getRole() === "SuperAdmin" ||
              getRole() === "Admin") && (
              <li>
                <NavLink
                  to="moderator"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Moderator
                </NavLink>
              </li>
            )}

          {auth.getLoggedIn() &&
            (getRole() === "Admin" || getRole() === "SuperAdmin") && (
              <li>
                <NavLink
                  to="admin"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Admin
                </NavLink>
              </li>
            )}
          {auth.getLoggedIn() && (
            <Fragment>
              <li>
                <NavLink
                  to="logout"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Logout
                </NavLink>
              </li>
              <li>
                <span className="span">Hello, {getName()}</span>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};
