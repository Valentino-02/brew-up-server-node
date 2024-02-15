import express from "express";

import { UserModel } from "../../../models/user";
import promiseHandler from "../../../../util/promiseHandler";
import {
  isAlcoholContent,
  isBitternessLevel,
  isColor,
} from "../../../../types/idealBeer";

export const getIdealBeer = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json(user.idealBeer).end();
};

export const updateIdealBeer = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { alcoholContent, bitternessLevel, color } = req.body;

  if (!alcoholContent && !bitternessLevel && !color) {
    return res.status(400).json({ error: "Missing at least one field" });
  }

  if (alcoholContent && !isAlcoholContent(alcoholContent)) {
    return res.status(400).json({ error: "Invalid alcoholContent string" });
  }

  if (bitternessLevel && !isBitternessLevel(bitternessLevel)) {
    return res.status(400).json({ error: "Invalid bitternessLevel string" });
  }

  if (color && !isColor(color)) {
    return res.status(400).json({ error: "Invalid color string" });
  }

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  if (alcoholContent) user.idealBeer.alcoholContent = alcoholContent;
  if (bitternessLevel) user.idealBeer.bitternessLevel = bitternessLevel;
  if (color) user.idealBeer.color = color;

  const [, err1] = await promiseHandler(user.save());
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json(user.idealBeer).end();
};
