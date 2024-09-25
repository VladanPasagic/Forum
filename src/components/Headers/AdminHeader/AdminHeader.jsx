import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./AdminHeader.css";

export const AdminHeader = () => {
  return (
    <Fragment>
      <nav className="navbar-bottom">
        <ul className="navbar-links">
          <li>
            <NavLink
              to="users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="requests"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Requests
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
