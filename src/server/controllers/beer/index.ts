import express from "express";

import promiseHandler from "../../../util/promiseHandler";
import { punkApiServer } from "../../../lib/axios";
import {
  isAlcoholContent,
  isBitternessLevel,
  isColor,
} from "../../../types/idealBeer";
import {
  getAlcoholValues,
  getBitternessValues,
  getColorValues,
} from "../../../util/idealBeerValues";

export const getRandomBeer = async (
  req: express.Request,
  res: express.Response
) => {
  const [response, err1] = await promiseHandler(punkApiServer.get(`/random`));
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Beer api server error" });
  }

  const randomBeer = response.data;

  return res.status(200).json(randomBeer).end();
};

export const getRandomIdealBeer = async (
  req: express.Request,
  res: express.Response
) => {
  const { alcoholContent, bitternessLevel, color } = req.body;

  if (!alcoholContent && !bitternessLevel && !color) {
    return res.status(400).json({ error: "Missing at least one field" });
  }

  if (alcoholContent && !isAlcoholContent(alcoholContent)) {
    return res.status(400).json({ error: "Invalid alcohol content string" });
  }

  if (bitternessLevel && !isBitternessLevel(bitternessLevel)) {
    return res.status(400).json({ error: "Invalid bitterness level string" });
  }

  if (color && !isColor(color)) {
    return res.status(400).json({ error: "Invalid color string" });
  }

  const [minAlcohol, maxAlcohol] = getAlcoholValues(alcoholContent);
  const [minBitterness, maxBitterness] = getBitternessValues(bitternessLevel);
  const [minColor, maxColor] = getColorValues(color);

  const alcoholQueryString = alcoholContent
    ? `abv_gt=${minAlcohol}&abv_lt=${maxAlcohol}`
    : "";
  const bitternessQueryString = bitternessLevel
    ? `&ibu_gt=${minBitterness}&ibu_lt=${maxBitterness}`
    : "";
  const colorQueryString = color
    ? `&ebc_gt=${minColor}&ebc_lt=${maxColor}`
    : "";

  const queryString = `?${alcoholQueryString}${bitternessQueryString}${colorQueryString}&per_page=80`;

  console.log(queryString);

  const [response, err1] = await promiseHandler(
    punkApiServer.get(`${queryString}`)
  );
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Beer api server error" });
  }

  const randomBeers = response.data;

  console.log("beers: ", randomBeers.length);

  return res.status(200).json(randomBeers).end();
};
