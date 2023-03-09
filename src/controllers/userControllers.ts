import { Request, Response } from "express";

import UserService from "../services/userServices.js";
import { UserBody } from "../types/userTypes.js";

async function createUser(req: Request, res: Response) {
  const user = req.body as UserBody;
  await UserService.createOne(user);
  
  res.sendStatus(201);
}

const controllers = {
  createUser
}

export default controllers;