import { createContext, useContext, useEffect, useState } from "react";
import { getIsLoggedIn } from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [twoFAUsed, set2FAUsed] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  };

  const set2FA = (val) => {
    set2FAUsed(val);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const getLoggedIn = () => {
    return twoFAUsed && isLoggedIn;
  };

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
    if (getIsLoggedIn()) set2FA(true);
  }, []);

  return (
    <AuthContext.Provider value={{ getLoggedIn, set2FA, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
