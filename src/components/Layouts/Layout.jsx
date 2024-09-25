import { Fragment } from "react";
import { Header } from "../Headers/Header/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  );
};
