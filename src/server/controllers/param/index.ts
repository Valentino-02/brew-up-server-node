import express from "express";

import { colors, levels } from "../../../types/idealBeer";

export async function getIdealBeerTypes(
  req: express.Request,
  res: express.Response
) {
  const idealBeerTypes = {
    alcoholContentTypes: levels,
    bitternessLevelTypes: levels,
    colorTypes: colors,
  };
  res.status(200).json(idealBeerTypes);
}
