// authStorage.js

const KEYS = {
  PROFILE_COMPLETED: "taxbuddy_profile_completed",
};

const STORAGE_KEYS = {
  USERNAME: "taxbuddy_user_name",
};

export const authStorage = {

  getProfileCompleted() {
    return localStorage.getItem(KEYS.PROFILE_COMPLETED) === "true";
  },


  saveUsername(username) {
    localStorage.setItem(STORAGE_KEYS.USERNAME, username);
  },

  getUsername() {
    return localStorage.getItem(STORAGE_KEYS.USERNAME);
  },

  clearUsername() {
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
  },

};