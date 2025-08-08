import { login, register } from "../controllers/user.controller.js";
import { Router } from "express";
import upload from "../utils/fileUpload.multer.js";

export const userRoutes = Router();
userRoutes.post("/register", upload.single("avatar"), register);
userRoutes.post("/login", login);
