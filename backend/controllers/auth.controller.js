import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const usernameExist = await User.findOne({ username });
  if (usernameExist) return res.status(400).json({ error: "Username already taken!" });

  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).json({ error: "Email already taken!" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newuser = new User({
    fullname,
    username,
    password: hashedPassword,
    email,
  });

  try {
    if (newuser) {
      generateTokenAndSetCookie(newuser._id, res);
      await newuser.save();
      res.status(201).json({
        created: {
          username: newuser.username,
          fullname: newuser.fullname,
          email: newuser.email,
          _id: newuser._id,
        },
      });
    } else {
      console.log("Error while makeing new user");
      res.status(400).json({ error: "Failed to create account" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {};
export const logout = async (req, res) => {};
