import express from "express";

import authRouter from "./auth";
import userRouter from "./user";
import paramRouter from "./param";

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

export default (app: express.Application) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/param", paramRouter);
};
