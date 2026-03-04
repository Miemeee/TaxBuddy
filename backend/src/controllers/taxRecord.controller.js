import * as service from "../services/taxRecord.service.js";

export const create = async (req, res, next) => {
  try {
    const { year } = req.params;
    const userId = req.user.id;

    const record = await service.createRecord(userId, year);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const { year } = req.params;
    const userId = req.user.id;

    const record = await service.getByYear(userId, year);

    res.json({
      success: true,
      data: record,
    });
  } catch (err) {
    next(err);
  }
};