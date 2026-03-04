// authStorage.js

const KEYS = {
  PROFILE_COMPLETED: "taxbuddy_profile_completed",
    USERNAME: "taxbuddy_user_name",
};

export const authStorage = {

  setProfileCompleted(value) {
    localStorage.setItem(KEYS.PROFILE_COMPLETED, String(value));
  },

  getProfileCompleted() {
    return localStorage.getItem(KEYS.PROFILE_COMPLETED) === "true";
  },

  saveUsername(username) {
    localStorage.setItem(KEYS.USERNAME, username);
  },

  getUsername() {
    return localStorage.getItem(KEYS.USERNAME);
  },

  clear() {
    localStorage.removeItem(KEYS.PROFILE_COMPLETED);
    localStorage.removeItem(KEYS.USERNAME);
  },


};