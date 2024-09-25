import { Fragment } from "react";
import "./ModeratorHeader.css";
import { NavLink } from "react-router-dom";

export const ModeratorHeader = () => {
  return (
    <Fragment>
      <nav className="navbar-bottom">
        <ul className="navbar-links">
          <li>
            <NavLink
              to="posts"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="comments"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Comments
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
