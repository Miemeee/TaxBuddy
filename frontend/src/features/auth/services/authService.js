import { authStorage } from "./authStorage";

export const authService = {

  shouldGoToDashboard() {
    return authStorage.getProfileCompleted();
  },

};