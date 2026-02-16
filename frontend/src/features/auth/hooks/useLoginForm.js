import { useState } from "react";
import { authStorage } from "../services/authStorage";

export function useLoginForm(onSuccess) {

  const [form, setForm] = useState({
    contact: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const updateField = (field) => (e) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const togglePassword = () => {
    setShowPass(prev => !prev);
  };

  const canSubmit =
    form.contact &&
    form.password;

  const submit = (e) => {
    e?.preventDefault();

    if (!canSubmit) return;

    const completed =
      authStorage.getProfileCompleted();

    onSuccess?.(completed);
  };

  return {
    form,
    showPass,
    canSubmit,
    updateField,
    togglePassword,
    submit,
  };
}