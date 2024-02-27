import express from "express";

import { getRandomBeer, getRandomIdealBeer } from "../../controllers/beer";

const beerRouter = express.Router();

beerRouter.get("/randomBeer", getRandomBeer);
beerRouter.post("/randomIdealBeer", getRandomIdealBeer);

export default beerRouter;
