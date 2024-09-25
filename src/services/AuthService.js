export const getIsLoggedIn = () => {
  return sessionStorage.getItem("JWT") != null;
};

export const addJWT = (token) => {
  sessionStorage.setItem("JWT", token);
};

export const removeJWT = () => {
  if (sessionStorage.getItem("JWT") != null) sessionStorage.removeItem("JWT");
};

export const getToken = () => {
  return `Bearer ${sessionStorage.getItem("JWT")}`;
};

export const getRole = () => {
  if (getToken() === "Bearer null") return "";
  const claims = decodeJwt();
  return claims.role;
};

const decodeJwt = () => {
  const token = sessionStorage.getItem("JWT");
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const base64UrlDecode = (str) => {
    let base64 = str.replace(/-/g, "+".replace(/_/g, "/"));

    while (base64.length % 4 !== 0) {
      base64 += "=";
    }

    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };
  const payload = parts[1];
  const decodedPayload = base64UrlDecode(payload);
  const claims = JSON.parse(decodedPayload);
  return claims;
};

export const getId = () => {
  var claims = decodeJwt();
  return claims.id;
};

export const getName = () => {
  var claims = decodeJwt();
  return claims.unique_name;
};
