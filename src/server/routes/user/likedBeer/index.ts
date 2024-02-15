import express from "express";

import {
  addBeer,
  deleteBeer,
  getBeers,
} from "../../../controllers/user/likedBeer";

const likedBeerRouter = express.Router({ mergeParams: true });

likedBeerRouter.get("/", getBeers);
likedBeerRouter.route("/:beerId").post(addBeer).delete(deleteBeer);

export default likedBeerRouter;
