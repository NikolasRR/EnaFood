import jwt from "jsonwebtoken";

import userRepo from "../repositories/userRepo.js";
import { UserBody } from "../types/userTypes.js";

async function createOne(user: UserBody) {
  const userAlreadyExists = await userRepo.getByEmail(user.email);
  if (userAlreadyExists) throw { type: "conflict" };

  await userRepo.create(user);
}

async function logIn(email: string) {
  const user = await userRepo.getByEmail(email);
  if (user === null) throw { type: "not found", message: "email not registered" };

  return generateToken(user.id);
}

function generateToken(id: string) {
  const TwentyFourHours = '24h';
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: TwentyFourHours });
  return token;
}

const userService = {
  createOne,
  logIn
}

export default userService;