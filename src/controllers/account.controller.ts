import { NextFunction, Response } from "express";
import User from "../models/user.model";
import Transaction from "../models/account.model";
import createHttpError from "http-errors";
import { AuthenticatedRequest } from "../middlewares/authenticate";

export const getBalance = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user!;

  try {
    const account = await User.findById(userId);
    if (!account) {
      const error = createHttpError("404", "Account not found");
      return next(error);
    }

    res.json({ balance: account.balance });
  } catch (err) {
    next(err);
  }
};

// Deposit money
export const depositMoney = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user!;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    const error = createHttpError("400", "Invalid deposit amount");
    return next(error);
  }
  try {
    const account = await User.findById(userId);
    if (!account) {
      const error = createHttpError("404", "Account not found");
      return next(error);
    }
    account.balance += amount;
    await account.save();

    await Transaction.create({
      accountId: userId,
      type: "deposit",
      amount,
    });

    res.json({ message: "Deposit successful", newBalance: account.balance });
  } catch (err) {
    next(err);
  }
};

// Withdraw money
export const withdrawMoney = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.user!;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    const error = createHttpError("400", "Invalid withdrawal amount");
    return next(error);
  }
  try {
    const account = await User.findById(userId);
    if (!account) {
      const error = createHttpError("404", "Account not found");
      return next(error);
    }
    if (account.balance < amount) {
      res.status(400).json({ message: "Insufficient funds" });
    }

    account.balance -= amount;
    await account.save();

    await Transaction.create({
      accountId: account._id,
      type: "withdrawal",
      amount,
    });

    res.json({ message: "Withdrawal successful", newBalance: account.balance });
  } catch (err) {
    next(err);
  }
};

// View transaction history
export const getTransactionHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.user!;

  try {
    const transactions = await Transaction.find({ accountId: userId }).sort({
      createdAt: -1,
    });
    res.json({ history: transactions });
  } catch (err) {
    next(err);
  }
};
