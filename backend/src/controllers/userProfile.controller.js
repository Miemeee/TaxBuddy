// controllers/userController.js

import prisma from "../config/prisma.js";

/**
 * @route GET /profile
 * @returns {Object} User profile with all related data
 */
export const getProfile = async (req, res) => {
  try {

    const userId = req.user.user_id;

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        // Get income channels
        incomeChannels: {
          select: {
            channel: true
          }
        },
        // Get deductions
        userDeductions: {
          include: {
            deduction: {
              select: {
                deduction_id: true,
                deduction_name: true,
                max_limit: true
              }
            }
          }
        }
      }
    });

    // Format response data
    const response = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      has_onboarded: user.has_onboarded,
      incomeChannels: user.incomeChannels.map(c => c.channel),
      userDeductions: user.userDeductions
    };

    res.json({
      success: true,
      data: response
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to get profile"
    });
  }
};

/**
 * Update user profile (name, phone)
 * @route PUT /profile
 * @body { name, phone_number }
 * @returns {Object} Updated user data
 */
export const updateProfile = async (req, res) => {
  try {

    const userId = req.user.user_id;
    const { name, phone_number } = req.body;

    // Update user in db
    const user = await prisma.user.update({
      where: { user_id: userId },
      data: {
        name,
        phone_number
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        phone_number: true
      }
    });

    res.json({
      success: true,
      data: user
    });

  } catch (err) {

    console.error("UPDATE PROFILE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
};


/**
 * Update user's income channels
 * @route PUT /profile/income-channels
 * @body { channels: ["channel1", "channel2"] }
 * @returns {Object} Success message
 */
export const updateIncomeChannels = async (req, res) => {
  try {

    const userId = req.user.user_id;
    const { channels } = req.body;

    if (!Array.isArray(channels)) {
      return res.status(400).json({
        success: false,
        message: "Channels must be an array"
      });
    }

    await prisma.incomeChannel.deleteMany({
      where: { user_id: userId }
    });

    const data = channels.map((channel) => ({
      channel,
      user_id: userId
    }));

    if (data.length > 0) {
      await prisma.incomeChannel.createMany({
        data
      });
    }

    res.json({
      success: true,
      message: "Income channels updated"
    });

  } catch (err) {

    console.error("UPDATE CHANNEL ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to update income channels"
    });
  }
};


/**
 * UPDATE DEDUCTIONS
 */
export const updateDeductions = async (req, res) => {
  try {

    const userId = req.user.user_id;
    const { tax_year, deductions } = req.body;

    if (!Array.isArray(deductions)) {
      return res.status(400).json({
        success: false,
        message: "Deductions must be an array"
      });
    }

    await prisma.userDeduction.deleteMany({
      where: {
        user_id: userId,
        tax_year
      }
    });

    const data = deductions.map((d) => ({
      user_id: userId,
      tax_year,
      deduction_id: d.deduction_id,
      amount_claimed: d.amount_claimed
    }));

    if (data.length > 0) {
      await prisma.userDeduction.createMany({
        data
      });
    }

    res.json({
      success: true,
      message: "Deductions updated"
    });

  } catch (err) {

    console.error("UPDATE DEDUCTIONS ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to update deductions"
    });
  }
};