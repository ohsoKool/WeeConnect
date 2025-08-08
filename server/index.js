import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.status(200).send("Server is running, Hello there!");
});
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
