import { useState } from "react";

export default function useOnboarding() {
  const storedName =
    localStorage.getItem("taxbuddy_user_name") || "TaxBuddy User";

  const [form, setForm] = useState({
    incomeChannel: "",
    maritalStatus: "single",
    hasChildren: "no",
    supportsParents: "no",
    isDisabled: "no",
  });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const saveProfile = () => {
    localStorage.setItem("taxbuddy_profile", JSON.stringify(form));
    localStorage.setItem("taxbuddy_profile_completed", "true");
  };

  return {
    storedName,
    form,
    handleChange,
    saveProfile,
  };
}