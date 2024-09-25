import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./ForumHeader.css";

export const ForumHeader = () => {
  return (
    <Fragment>
      <nav className="navbar-bottom">
        <ul className="navbar-links">
          <li>
            <NavLink
              to="new"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              New post
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
