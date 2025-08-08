import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
  const payload = { id: userId };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
