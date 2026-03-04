import * as taxService from "../services/tax.service.js";

export const calculate = async (req, res, next) => {
  try {
    const { year } = req.query;
    const userId = req.user.id;

    const result = await taxService.calculate(userId, year);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};