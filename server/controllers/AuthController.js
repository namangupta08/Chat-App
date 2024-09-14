import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { compare , hash , genSalt } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const SignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });
    }

    const user = await User.create({ email, password});

    //jwt token

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Email and password are required",
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User with the given email not found",
        });
      }
  
      //console.log(user.password)
  
      const auth = await compare(password, user.password);
  
      if (!auth) {
        return res.status(400).send({
          success: false,
          message: "Password is incorrect",
        });
      }
  
      //jwt token
  
      res.cookie("jwt ", createToken(email, user.id), {
        maxAge,
        secure: true,
        sameSite: "None",
      });
  
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          color: user.color,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
};


export const getUserInfo = async (req, res, next) => {
    try {

      console.log("User id in getuserinfo auth controller" , req.userId)
      const userData = await User.findById(req.userId);
      if (!userData) {
        return res.status(404).send("User with given id not found");
      }
  
      return res.status(200).json({
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };
