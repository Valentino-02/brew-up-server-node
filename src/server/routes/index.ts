import express from "express";

import authRouter from "./auth";
import userRouter from "./user";
import paramRouter from "./param";
import beerRouter from "./beer";

export default (app: express.Application) => {
  app.use("/auth", authRouter);
  app.use("/beer", beerRouter);
  app.use("/user", userRouter);
  app.use("/param", paramRouter);
};
