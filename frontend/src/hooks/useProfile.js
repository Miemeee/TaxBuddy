// src/hooks/useProfile.js

import { useEffect, useState } from "react";
import api from "../api/axios";  

export default function useProfile() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {

      const res = await api.get("/user-profile/profile");

      console.log("PROFILE API:", res.data);

      if (res.data?.success) {
        setProfile(res.data.data);
      }

    } catch (err) {
      console.error("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    await api.patch("/user-profile/profile", data);
    fetchProfile();
  };

  const updateChannels = async (channels) => {
    await api.put("/user-profile/income-channels", { channels });
    fetchProfile();
  };

  const updateDeductions = async (payload) => {
    await api.put("/user-profile/deductions", payload);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    updateProfile,
    updateChannels,
    updateDeductions
  };
}