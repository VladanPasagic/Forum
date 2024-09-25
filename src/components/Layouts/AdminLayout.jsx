import { Fragment } from "react";
import { AdminHeader } from "../Headers/AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <Fragment>
      <AdminHeader></AdminHeader>
      <Outlet></Outlet>
    </Fragment>
  );
};
