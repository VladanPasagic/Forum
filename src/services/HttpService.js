import { baseURL } from "../configuration/config";
import { getToken, removeJWT } from "./AuthService";

export const httpRequest = async (url, options) => {
  try {
    const response = await fetch(baseURL + url, options);

    if (!response.ok) {
      if (response.status === 400) throw new Error(response.json());
      if (response.status === 401) {
        removeJWT();
        throw new Error(401);
      }
      if (response.status===403)
      {
        throw new Error(403);
      }
      try {
        return await response.json();
      } catch (error) {
        throw error;
      }
    }
    if (response.status === 202) {
      return;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const get = async (url, headers) => {
  let header;
  if (getToken() !== "Bearer null")
    header = { "Content-Type": "application/json", Authorization: getToken() };
  else header = { "Content-Type": "application/json" };

  return httpRequest(url, {
    method: "GET",
    headers: headers || header,
  });
};

export const post = async (url, body, headers) => {
  let header;
  if (getToken() !== "Bearer null")
    header = { "Content-Type": "application/json", Authorization: getToken() };
  else header = { "Content-Type": "application/json" };
  return httpRequest(url, {
    method: "POST",
    headers: headers || header,
    body: JSON.stringify(body),
  });
};

export const put = async (url, body, headers) => {
  let header;
  if (getToken() !== "Bearer null")
    header = { "Content-Type": "application/json", Authorization: getToken() };
  else header = { "Content-Type": "application/json" };
  return httpRequest(url, {
    method: "PUT",
    headers: headers || header,
    body: JSON.stringify(body),
  });
};

export const del = async (url, headers) => {
  let header;
  if (getToken() !== "Bearer null")
    header = { "Content-Type": "application/json", Authorization: getToken() };
  else header = { "Content-Type": "application/json" };
  return httpRequest(url, {
    method: "DELETE",
    headers: headers || header,
  });
};

export const patch = async (url, headers) => {
  let header;
  if (getToken() !== "Bearer null")
    header = { "Content-Type": "application/json", Authorization: getToken() };
  else header = { "Content-Type": "application/json" };
  return httpRequest(url, {
    method: "PATCH",
    headers: headers || header,
  });
};
