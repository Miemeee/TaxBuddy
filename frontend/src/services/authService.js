import axios from "../api/axios";

/**
 * Register
 * @param {Object} data - { name, email, password }
 * @returns {Promise} Response
 */
export const register = (data) =>
  axios.post("/auth/register", data);

/**
 * Login
 * @param {Object} data - { email, password }
 * @returns {Promise} Response w/ JWT token
 */
export const login = (data) =>
  axios.post("/auth/login", data);

/**
 * Check token
 * @returns {Boolean} True if token exists
 */
export const shouldGoToDashboard = () => {
  return localStorage.getItem("token") !== null;
};

/**
 * Fetch user
 * Requires JWT token
 * @returns {Promise} User profile data
 */
export const getMe = async () => {
  return axios.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
/**
 * Logout user and revoke token on server
 * @returns {Promise} Response
 */
export const logout = () => axios.post("/auth/logout");