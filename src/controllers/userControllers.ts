import { Request, Response } from "express";

import userService from "../services/userServices.js";
import { UserBody } from "../types/userTypes.js";

async function createUser(req: Request, res: Response) {
  const user = req.body as UserBody;
  await userService.createOne(user);
  
  res.sendStatus(201);
}

async function logUserIn(req: Request, res: Response) {
  const email = req.body.email as string;
  const token = await userService.logIn(email);

  res.send({token : token});
}

const controllers = {
  createUser,
  logUserIn
}

export default controllers;