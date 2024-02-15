import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const { SECRET = "secret" } = process.env;

export interface CustomRequest extends express.Request {
  token: string | JwtPayload;
}

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Please add auth token" });
  }

  const decoded = jwt.verify(token, SECRET);
  if (!decoded) {
    return res.status(401).json({ error: "Not authorized" });
  }

  (req as CustomRequest).token = decoded;
  next();
};
