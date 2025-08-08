import { hash, compare } from "bcrypt";
import User from "../models/user.model.js";
import { registerZodSchema, loginZodSchema } from "../utils/schema.types.js";
import { generateTokens } from "../utils/tokenHandler.js";

export const register = async (req, res) => {
  try {
    const inputData = {
      ...req.body,
      avatar: req.file?.path || "avatar not given",
    };

    const parsedData = registerZodSchema.safeParse(inputData);
    if (!parsedData.success) {
      return res.status(400).json({ errors: parsedData.error.format() });
    }
    const { userName, email, password, mobile, avatar } = parsedData.data;
    const existingUser = await User.findOne({ email });
    console.log("1");
    if (existingUser) {
      console.log("2");
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }
    console.log("3");
    const hashedPassword = await hash(password, 10);
    console.log("4");
    const newUser = await User.create({
      userName,
      password: hashedPassword,
      email,
      mobile,
      avatar,
    });

    return res.status(201).json({
      Message: "User successfully created",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        mobile: newUser.mobile,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something failed while registrating user", error });
  }
};
export const login = async (req, res) => {
  const loginInput = {
    ...req.body,
  };
  const parsedData = loginZodSchema.safeParse(loginInput);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.format() });
  }

  const { email, password } = parsedData.data;
  if (!email || !password) {
    return res
      .status(400)
      .json({ Message: "Require both userName and password" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      const isMatching = await compare(password, existingUser.password);
      if (!isMatching) {
        return res.status(400).json({
          message: "Enter the correct credentials, login failed",
        });
      } else {
        const { accessToken, refreshToken } = generateTokens(existingUser._id);

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 1000, // 30 seconds
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
          message: "User logged in successfully!!",
          user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            mobile: existingUser.mobile,
            avatar: existingUser.avatar,
          },
          token: accessToken,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in" });
  }
};
