import { useState } from "react";

export default function useOnboarding() {
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

  return {
    form,
    setForm,
    handleChange,
  };
}