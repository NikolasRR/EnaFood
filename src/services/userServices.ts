import jwt from "jsonwebtoken";

import userRepo from "../repositories/userRepo.js";
import { UserBody } from "../types/userTypes.js";

async function createOne(user: UserBody) {
  await userRepo.create(user);
}

async function logIn(email: string) {
  const user = await userRepo.getByEmail(email);
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