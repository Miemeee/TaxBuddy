import * as service from "../services/transaction.service.js";

export const getByYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const userId = req.user.user_id;

    const data = await service.getByYear(userId, year);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const result = await service.create(userId, req.body);

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const result = await service.update(userId, id, req.body);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const result = await service.remove(userId, id);

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

