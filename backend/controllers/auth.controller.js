import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const usernameExist = await User.findOne({ username });
  if (usernameExist) return res.status(400).json({ error: "Username already taken!" });

  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).json({ error: "Email already taken!" });

  if(password.length < 6) return res.status(400).json({error : "Password must be atleast 6 characters"})

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

export const login = async (req, res) => {
    const {username , password} = req.body;

    try {
        const user = await User.findOne({username});
        if(user) {
            const isCorrect = await bcrypt.compare(password , user?.password || "");
            if(!isCorrect) res.status(400).json({error : "Incorrect Password!"});
            generateTokenAndSetCookie(user._id, res);
            res.status(200).json({message : "Logged in Successfully" , username , password, id: user._id});
        } else {
            console.log("User doesnt exist!");
            res.status(400).json({error : "User doesnt exist!"})
        }

    } catch (e) {
        console.log("Error while logging in" , e);
        res.status(500).json({error : "Internal server error"});
    }

};


export const logout = async (req, res) => {
    try {
        res.cookie("jwt" , "" , {maxAge: 0});
        res.status(200).json({message : "Logged out successfully"})
    } catch (e) {
        res.status(500).json({error : "Error while logging out"})
    }
};


export const getMe = async  (req , res) => {
    try {
       const user = req.user;
       res.status(200).json(user);
    } catch (e) {
        res.status(500).json({error : "Error while fetching user"})
    }
}
