import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export const useLoginForm = (onSuccess) => {
  const { fetchUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
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
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    !loading;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);
      setError("");

      const response = await login(form);

      const payload = response.data?.data || response.data;

      const token = payload?.token;
      const hasOnboarded = payload?.hasOnboarded;

      if (!token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);

      await fetchUser();

      if (onSuccess) {
        onSuccess(hasOnboarded);
      }

    } catch (err) {
      console.error("Login error:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      setError(message);

      throw new Error(message);

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    showPass,
    loading,
    error,
    canSubmit,
    updateField,
    togglePassword,
    submit,
  };
};