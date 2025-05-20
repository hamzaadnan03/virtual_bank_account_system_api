import mongoose, { Schema } from "mongoose";
import { Transaction } from "../types/account";

const transactionSchema = new Schema<Transaction>(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<Transaction>(
  "Transaction",
  transactionSchema
);
export default Transaction;
