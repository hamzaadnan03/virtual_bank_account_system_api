export interface Transaction {
  accountId: mongoose.Types.ObjectId;
  type: "deposit" | "withdrawal";
  amount: number;
}
