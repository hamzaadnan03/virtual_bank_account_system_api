import express from "express";
import globalErrorHanlder from "./middlewares/globalErrorHandler";
import userRoutes from "./routes/user.route";
import accountRoutes from "./routes/account.route";

const app = express();
app.use(express.json());

//routes for user
app.use("/api/v1/users", userRoutes);
app.use("/api/accounts", accountRoutes);

app.use(globalErrorHanlder);

export default app;
