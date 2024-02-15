import express from "express";

import { UserModel } from "../../../models/user";
import promiseHandler from "../../../../util/promiseHandler";
import { punkApiServer } from "../../../../lib/axios";

export const addBeer = async (req: express.Request, res: express.Response) => {
  const { id, beerId } = req.params;

  if (!beerId) {
    return res.status(400).json({ error: "Missing beerId query param" });
  }

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  if (user.likedBeersIds.includes(beerId)) {
    return res.status(400).json({ error: "Beer already stored" });
  }

  const [, err1] = await promiseHandler(punkApiServer.get(`/${beerId}`));
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Beer api server error" });
  }

  user.likedBeersIds.push(beerId);

  const [, err2] = await promiseHandler(user.save());
  if (err2) {
    console.log(err2);
    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json(user.likedBeersIds).end();
};

export const getBeers = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  const beerIdsString = user.likedBeersIds.join("|");

  const [response, err1] = await promiseHandler(
    punkApiServer.get(`?ids=${beerIdsString}`)
  );
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Server error" });
  }

  const beers = response.data;

  return res.status(200).json(beers).end();
};

export const deleteBeer = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, beerId } = req.params;

  if (!beerId) {
    return res.status(400).json({ error: "Missing beerId query param" });
  }

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  if (!user.likedBeersIds.includes(beerId)) {
    return res.status(400).json({ error: "Beer not stored" });
  }

  user.likedBeersIds = user.likedBeersIds.filter((elem) => elem != beerId);
  const [, err1] = await promiseHandler(user.save());
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json(user.likedBeersIds).end();
};
