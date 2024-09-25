import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeJWT } from "../services/AuthService";
import { patch } from "../services/HttpService";
import { useAuth } from "../contexts/AuthContext";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    removeJWT();
    patch(`Authentication/logout`)
      .then(() => {
        auth.logout();
        auth.set2FA(false);
        navigate("/login");
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
};
