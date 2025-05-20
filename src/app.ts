import express from "express";
import globalErrorHanlder from "./middlewares/globalErrorHandler";
import userRoutes from "./routes/user.route";
import accountRoutes from "./routes/account.route";
import cors from "cors";
import { config } from "./config/config";

const app = express();
app.use(
  cors({
    origin: config.frontEndUri,
    credentials: true,
  })
);
app.use(express.json());

//routes for user
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/accounts", accountRoutes);

app.use(globalErrorHanlder);

export default app;
