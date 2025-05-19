import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  dbUrl: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  frontEndUri: process.env.FRONT_END_URI,
};

export const config = Object.freeze(_config);
