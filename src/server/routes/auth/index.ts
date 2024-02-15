import express from "express";

import { login, signin } from "../../controllers/auth";

const authRouter = express.Router();

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

authRouter.post("/signin", signin);
authRouter.post("/login", login);

export default authRouter;
