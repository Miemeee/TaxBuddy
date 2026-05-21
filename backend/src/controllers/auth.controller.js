import * as authService from "../services/auth.service.js";

/**
 * @route POST /auth/register
 * @returns {Object} { success, data: { user_id, name, email } }
 */
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route POST /auth/login
 * @returns {Object} { success, data: { token, hasOnboarded } }
 */
export const login = async (req, res, next) => {
  try {
    // Authen JWT
    const result = await authService.login(req.body);

    // Return JWT, onboarding status
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route POST /auth/google-login
 * @returns {Object} { success, data: { token, hasOnboarded } }
 */
export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    const result = await authService.googleLogin(token);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    await authService.logout(token);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
