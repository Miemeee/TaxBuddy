import prisma from "../config/prisma.js";

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
    orderBy: {
      date: "desc",
    },
  });
};

export const create = async (userId, data) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (
    data.amount === undefined ||
    data.category == null ||
    data.date == null ||
    data.transaction_type == null
  ) {
    throw new Error("Missing required fields");
  }

  const parsedAmount = Number(data.amount);

  if (isNaN(parsedAmount)) {
    throw new Error("Invalid amount");
  }

  return await prisma.transaction.create({
    data: {
      user_id: userId,
      amount: parsedAmount,
      category: data.category,
      description: data.description || null,
      date: new Date(data.date),
      transaction_type: data.transaction_type,
      wallet_type: data.wallet_type ?? null,
      profession_id: data.profession_id ?? null,
    },
  });
};

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
      category: data.category ?? existing.category,
      description: data.description ?? existing.description,
      date: data.date ? new Date(data.date) : existing.date,
      transaction_type:
        data.transaction_type ?? existing.transaction_type,
      wallet_type: data.wallet_type ?? existing.wallet_type,
      profession_id: data.profession_id ?? existing.profession_id,
    },
  });
};

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

  await prisma.transaction.delete({
    where: { transaction_id: parseInt(transactionId) },
  });

  return { message: "Transaction deleted successfully" };
};