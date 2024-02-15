import express from "express";
import { JwtPayload } from "jsonwebtoken";

import { CustomRequest } from "./auth";

export const userIdMiddleware = async (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.token as JwtPayload;
  const currentUserId = token.userId;
  const { id } = req.params;
  if (currentUserId != id) {
    return res
      .status(401)
      .json({ error: "Id mismatch between query param and jwt" });
  }
  next();
};
