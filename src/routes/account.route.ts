import express from "express";
import {
  depositMoney,
  getBalance,
  getTransactionHistory,
  withdrawMoney,
} from "../controllers/account.controller";

const router = express.Router();

// GET /api/accounts/:userId/balance
router.get("/:userId/balance", getBalance);

// POST /api/accounts/:userId/deposit
router.post("/:userId/deposit", depositMoney);

// POST /api/accounts/:userId/withdraw
router.post("/:userId/withdraw", withdrawMoney);

// GET /api/accounts/:userId/transactions
router.get("/:userId/transactions", getTransactionHistory);

export default router;
