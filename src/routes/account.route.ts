import express from "express";
import {
  depositMoney,
  getBalance,
  getTransactionHistory,
  withdrawMoney,
} from "../controllers/account.controller";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// GET /api/accounts/balance
router.get("/balance", authenticate, getBalance);

// POST /api/accounts/deposit
router.post("/deposit", authenticate, depositMoney);

// POST /api/accounts/withdraw
router.post("/withdraw", authenticate, withdrawMoney);

// GET /api/accounts/transactions
router.get("/transactions", authenticate, getTransactionHistory);

export default router;
