import { Fragment } from "react";
import { ForumHeader } from "../Headers/ForumHeader/ForumHeader";
import { Outlet } from "react-router-dom";

export const ForumLayout = () => {
  return (
    <Fragment>
      <ForumHeader></ForumHeader>
      <Outlet></Outlet>
    </Fragment>
  );
};
