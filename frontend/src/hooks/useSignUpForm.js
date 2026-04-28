import { useState } from "react";
import { register, login } from "../services/authService";

export const useSignUpForm = (onSuccess) => {
  const [form, setForm] = useState({
    username: "",
    contact: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const updateField = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  const canSubmit =
    form.username.trim() !== "" &&
    form.contact.trim() !== "" &&
    form.password.trim() !== "" &&
    acceptTerms &&
    !loading;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      setError(""); 

      await register({
        name: form.username,
        email: form.contact,
        password: form.password,
      });

      const response = await login({
        email: form.contact,
        password: form.password,
      });

      const payload = response.data?.data || response.data;

      const { token, hasOnboarded } = payload;

      if (!token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("has_onboarded", String(hasOnboarded));

      if (onSuccess) {
        onSuccess(hasOnboarded);
      }

} catch (err) {
      console.log("2. Data from backend:", err.response?.data);

      const errorData = err.response?.data;
      throw {
        errorCode: errorData?.errorCode || "UNKNOWN_ERROR",
        message: errorData?.message || err.message
      };

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    showPass,
    acceptTerms,
    loading,
    error,
    canSubmit,
    updateField,
    togglePassword,
    setAcceptTerms,
    submit,
  };
};