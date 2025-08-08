import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: false,
    allowedHeaders: true,
    origin: process.env.ORIGIN_API_URL,
  })
);
app.use(express.json());
app.use(express.static("public/temp"));

app.get("/", (req, res) => {
  res.status(200).send("Server is running, Hello there!");
});

connectDB();
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Routes
app.use("/weeConnect/api/user", userRoutes);
