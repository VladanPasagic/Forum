import { redirect } from "react-router-dom";
import { getRole } from "./AuthService";

export const handleNonMemberRedirect = () => {
  let role = getRole();
  if (
    role !== "Member" &&
    role !== "Moderator" &&
    role !== "Admin" &&
    role !== "SuperAdmin"
  )
    return redirect("/login");
  return null;
};

export const handleNonModeratorRedirect = () => {
  let role = getRole();
  if (role !== "Moderator" && role !== "Admin" && role !== "SuperAdmin")
    return redirect("/forum");
  return null;
};

export const handleNonAdminRedirect = () => {
  let role = getRole();
  if (role !== "Admin" && role !== "SuperAdmin") return redirect("/forum");
  return null;
};

export const handleAuthedRedirect = () => {
  let role = getRole();
  if (role !== "") return redirect("/forum");
  return null;
};
