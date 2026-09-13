import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { tokenBlacklistModel } from "../models/blacklist.model.js";


export async function registerUser(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Please provide username,password and email",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "username or email already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    config.JWT_KEY,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function logoutUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }
  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
}
