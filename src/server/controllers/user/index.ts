import express from "express";

import { UserModel } from "../../models/user";
import promiseHandler from "../../../util/promiseHandler";

export async function getAllUsers(req: express.Request, res: express.Response) {
  const [users, err] = await promiseHandler(UserModel.find());
  if (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(users);
}

export async function getUser(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const [user, err] = await promiseHandler(UserModel.findById(id));
  if (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(user);
}

export async function deleteUser(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const [deletedUser, err] = await promiseHandler(
    UserModel.findOneAndDelete({ _id: id })
  );
  if (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }

  return res.status(200).json(deletedUser);
}

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing field username" });
  }

  const [user, err0] = await promiseHandler(UserModel.findById(id));
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  user.username = username;
  const [, err1] = await promiseHandler(user.save());
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Server error" });
  }

  return res.status(200).json(user).end();
};
