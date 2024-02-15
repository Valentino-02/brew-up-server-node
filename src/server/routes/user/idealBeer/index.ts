import express from "express";

import {
  updateIdealBeer,
  getIdealBeer,
} from "../../../controllers/user/idealBeer";

const idealBeerRouter = express.Router({ mergeParams: true });

idealBeerRouter.route("/").patch(updateIdealBeer).get(getIdealBeer);

export default idealBeerRouter;
