import axios from "../api/axios";

export const register = (data) =>
  axios.post("/auth/register", data);

export const login = (data) =>
  axios.post("/auth/login", data);

export const shouldGoToDashboard = () => {
  return localStorage.getItem("token") !== null;
};

export const getMe = async () => {
  return axios.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};