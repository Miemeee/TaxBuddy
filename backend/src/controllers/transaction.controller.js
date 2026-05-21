import * as service from "../services/transaction.service.js";

export const getByYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const userId = req.user.user_id;

    // Fetch transactions 
    const data = await service.getByYear(userId, year);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new transaction (income or expense)
 * @route POST /transactions
 * @body { amount, type, date, description, wallet_type }
 * @returns {Object} Created transaction
 */
export const create = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const payload = { ...req.body };

    if (req.file) {
      payload.file = req.file;
    }

    const result = await service.create(userId, payload);

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * Update an existing transaction
 * @route PUT /transactions/:id
 * @returns {Object} Updated transaction
 */
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

/**
 * Delete a transaction
 * @route DELETE /transactions/:id
 * @returns {Object} Deleted transaction
 */
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

