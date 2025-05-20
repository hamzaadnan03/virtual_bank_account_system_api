import express, { RequestHandler } from "express";
import {
  depositMoney,
  getBalance,
  getTransactionHistory,
  withdrawMoney,
} from "../controllers/account.controller";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

// GET /api/accounts/balance
router.get("/balance", authenticate, getBalance as RequestHandler);

// POST /api/accounts/deposit
router.post("/deposit", authenticate, depositMoney as RequestHandler);

// POST /api/accounts/withdraw
router.post("/withdraw", authenticate, withdrawMoney as RequestHandler);

// GET /api/accounts/transactions
router.get(
  "/transactions",
  authenticate,
  getTransactionHistory as RequestHandler
);

export default router;
