import express from "express";

import { getIdealBeerTypes } from "../../controllers/param";

const paramRouter = express.Router();

paramRouter.get("/idealBeer", getIdealBeerTypes);

export default paramRouter;
