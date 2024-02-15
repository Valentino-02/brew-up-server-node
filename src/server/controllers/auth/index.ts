import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../../models/user";
import promiseHandler from "../../../util/promiseHandler";

const { SECRET = "secret" } = process.env;

export async function signin(req: express.Request, res: express.Response) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Missing field" });
  }

  const [existingUser, err0] = await promiseHandler(
    UserModel.findOne({ email })
  );
  if (err0) {
    console.log(err0);
    return res.status(500).json({ error: "Server error" });
  }

  if (existingUser) {
    return res.status(400).json({ error: "User already registered" });
  }

  req.body.password = await bcrypt.hash(password, 10);

  const [, err1] = await promiseHandler(UserModel.create(req.body));
  if (err1) {
    console.log(err1);
    return res.status(500).json({ error: "Server error" });
  }

  res.status(201).json({ message: "User created succesfully" });
}

export async function login(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing field" });
  }

  const [user, err] = await promiseHandler(
    UserModel.findOne({ email }).select("+password")
  );
  if (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }

  if (!user) {
    return res.status(400).json({ error: "User not registered" });
  }

  console.log(password, user.password);
  const isMatchingPassword = await bcrypt.compare(password, user.password);
  if (!isMatchingPassword) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user._id }, SECRET);
  res.status(200).json(token);
}
