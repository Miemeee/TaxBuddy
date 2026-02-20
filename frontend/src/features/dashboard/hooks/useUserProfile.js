// src/pages/hooks/useUserProfile.js

import { authStorage } from "../../auth/services/authStorage";

export const useUserProfile = () => {
  const username = authStorage.getUsername() || "User";

  return {
    username,
    initial: username.charAt(0).toUpperCase(),
  };
};