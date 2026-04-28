// src/pages/hooks/useUserProfile.js

import { authStorage } from "../services/authStorage";

export const useUserProfile = () => {
  const username = authStorage.getUsername() || "User";

  return {
    username,
    initial: username.charAt(0).toUpperCase(),
  };
};