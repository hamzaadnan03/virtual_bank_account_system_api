import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const error = createHttpError("400", "All fields are required");
      return next(error);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = createHttpError(
        "400",
        "User already exist with this email"
      );
      return next(error);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id },
      config.jwtSecret as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError("400", "All fields are required");
    return next(error);
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = createHttpError("400", "User not exist. Signup first");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = createHttpError("401", "Invalid credentials");

      return next(error);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret || "your-secret-key",
      { expiresIn: "1h" }
    );

    // Respond with the generated JWT as accessToken
    res.status(200).json({
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
