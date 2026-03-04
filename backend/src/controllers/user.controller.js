// src/controllers/user.controller.js

import prisma from "../config/prisma.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { income_channel } = req.body;

    await prisma.incomeChannel.deleteMany({
      where: { user_id: userId },
    });

    if (income_channel?.length) {
      await prisma.incomeChannel.createMany({
        data: income_channel.map((channel) => ({
          channel,
          user_id: userId,
        })),
      });
    }

    await prisma.user.update({
      where: { user_id: userId },
      data: { has_onboarded: true },
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        name: true,
        email: true,
        has_onboarded: true, 
      },
    });

    const incomeChannels = await prisma.incomeChannel.findMany({
      where: { user_id: userId },
      select: { channel: true },
    });

    res.json({
      success: true,
      data: {
        ...user,
        hasOnboarded: user.has_onboarded, 
        incomeChannels: incomeChannels.map(i => i.channel),
      },
    });

  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ success: false });
  }
};