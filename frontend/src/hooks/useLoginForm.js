import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

/**
 * @param {Function} onSuccess - Callback function after successful login
 * @returns {Object} Form state, handlers, and submission function
 */
export const useLoginForm = (onSuccess) => {
  const { fetchUser } = useAuth();

  // Form state for email and password inputs
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");         

  /**
   * Update form field value
   * @param {String} field - Field name (email or password)
   */
  const updateField = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /**
   * show/hide
   */
  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };

  /**
   * Email pass ok
   */
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

      // Call login API 
      const response = await login(form);

      // Extract JWT token and onboarding status
      const payload = response.data?.data || response.data;

      const token = payload?.token;
      const hasOnboarded = payload?.hasOnboarded;

      if (!token) {
        throw new Error("Invalid login response");
      }

      // Store JWT
      localStorage.setItem("token", token);

      // Fetch and update user profile in AuthContext
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