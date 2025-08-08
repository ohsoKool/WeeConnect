import { hash } from "bcrypt";
import User from "../models/user.model.js";
import upload from "../utils/fileUpload.multer.js";
import { safeParse } from "zod";
import { userZodSchema } from "../utils/schema.types.js";

export const register = async (req, res) => {
  try {
    const inputData = {
      ...req.body,
      avatar: req.file?.path || "avatar not given",
    };

    const parsedData = userZodSchema.safeParse(inputData);
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

    res.status(201).json({
      Message: "User successfully created",
      newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something failed while registrating user", error });
  }
};
export const login = async () => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ Message: "Require both userName and password" });
  }
};
