import { useState } from "react";
import { authStorage } from "../services/authStorage";

export function useSignupForm(onSuccess) {

  const [form, setForm] = useState({
    username: "",
    contact: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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
    form.username &&
    form.contact &&
    form.password &&
    acceptTerms;

  const submit = () => {

    if (!canSubmit) return;

    authStorage.saveUsername(form.username);

    onSuccess?.();
  };

  return {
    form,
    showPass,
    acceptTerms,
    canSubmit,

    updateField,
    togglePassword,
    setAcceptTerms,
    submit,
  };
}