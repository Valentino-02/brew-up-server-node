import express from "express";

import { deleteUser, getUser, updateUser } from "../../controllers/user";
import { authMiddleware } from "../../middleware/auth";
import { userIdMiddleware } from "../../middleware/userId";
import idealBeerRouter from "./idealBeer";
import likedBeerRouter from "./likedBeer";

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.use("/:id", userIdMiddleware);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

userRouter.use("/:id/idealBeer", idealBeerRouter);
userRouter.use("/:id/likedBeer", likedBeerRouter);

export default userRouter;
