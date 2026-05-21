import prisma from "../config/prisma.js";

/**
 * @param {Number} userId - User ID
 * @param {Number} year - Tax year to fetch transactions for
 * @returns {Array} Transactions ordered by date (newest first)
 * @throws {Error} If year is not provided
 */
export const getByYear = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  return await prisma.transaction.findMany({
    where: {
      user_id: userId,
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    include: {
      document: true,
    },
    orderBy: {
      date: "desc",  // Sort new first
    },
  });
};

/**
 * @param {Number} userId - User ID
 * @param {Object} data - Transaction data {amount, date, transaction_type, description, wallet_type}
 * @returns {Object} Created transaction object
 * @throws {Error} If required fields missing or invalid
 */
export const create = async (userId, data) => {
  // Validate user authen
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Validate required fields
  if (
    data.amount === undefined ||
    data.date == null ||
    data.transaction_type == null
  ) {
    throw new Error("Missing required fields");
  }

  // Parse and validate amount is a valid number
  const parsedAmount = Number(data.amount);

  if (isNaN(parsedAmount)) {
    throw new Error("Invalid amount");
  }

  let documentId = null;

  if (data.file) {
    const document = await prisma.document.create({
      data: {
        file_path: `/uploads/${data.file.filename}`,
      },
    });

    documentId = document.document_id;
  }

  // Create transaction in database
  return await prisma.transaction.create({
    data: {
      user_id: userId,
      amount: parsedAmount,
      description: data.description || null,
      date: new Date(data.date),
      transaction_type: data.transaction_type,
      wallet_type: data.wallet_type ?? null,
      profession_id: data.profession_id ?? null,
      document_id: documentId,
    },
    include: {
      document: true,
    },
  });
};

/**
 * @param {Number} userId - User ID 
 * @param {Number} transactionId - Transaction ID 
 * @param {Object} data - Updated transaction data
 * @returns {Object} Updated transaction
 * @throws {Error} If transaction not found
 */
export const update = async (userId, transactionId, data) => {
  const existing = await prisma.transaction.findFirst({
    where: {
      transaction_id: parseInt(transactionId),
      user_id: userId,
    },
  });

  if (!existing) {
    throw new Error("Transaction not found");
  }

  return await prisma.transaction.update({
    where: { transaction_id: parseInt(transactionId) },
    data: {
      amount:
        data.amount !== undefined
          ? parseFloat(data.amount)
          : existing.amount,
      description: data.description ?? existing.description,
      date: data.date ? new Date(data.date) : existing.date,
      transaction_type:
        data.transaction_type ?? existing.transaction_type,
      wallet_type: data.wallet_type ?? existing.wallet_type,
      profession_id: data.profession_id ?? existing.profession_id,
    },
  });
};

/**
 * @param {Number} userId - User ID 
 * @param {Number} transactionId - Transaction ID to delete
 * @returns {Object} Success message
 * @throws {Error} If transaction not found
 */
export const remove = async (userId, transactionId) => {
  const existing = await prisma.transaction.findFirst({
    where: {
      transaction_id: parseInt(transactionId),
      user_id: userId,
    },
  });

  if (!existing) {
    throw new Error("Transaction not found");
  }

  // Delete transaction
  await prisma.transaction.delete({
    where: { transaction_id: parseInt(transactionId) },
  });

  return { message: "Transaction deleted successfully" };
};