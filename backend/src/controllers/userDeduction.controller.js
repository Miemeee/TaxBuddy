import * as service from "../services/userDeduction.service.js";

export const getByYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const userId = req.user.user_id;

    const data = await service.getByYear(userId, year);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const userId = req.user.user_id;  

    const result = await service.create(userId, req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};