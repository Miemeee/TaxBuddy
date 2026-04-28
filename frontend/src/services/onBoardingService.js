import axios from "../api/axios";

export const createUserDeduction = (data) => {
  return axios.post("/user-deductions", data);
};

export const submitOnboarding = (data) => {
  return axios.post("/onboarding", data);
};

export const updateUserProfile = (data) => {
  return axios.put("/users/profile", data);
};
