import { Fragment } from "react";
import { ModeratorHeader } from "../Headers/ModeratorHeader/ModeratorHeader";
import { Outlet } from "react-router-dom";

export const ModeratorLayout = () => {
  return (
    <Fragment>
      <ModeratorHeader></ModeratorHeader>
      <Outlet></Outlet>
    </Fragment>
  );
};
