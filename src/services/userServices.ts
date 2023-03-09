import UserRepo from "../repositories/userRepo.js";
import { UserBody } from "../types/userTypes.js";

async function createOne(user: UserBody) {
  await UserRepo.create(user);
}

const UserService = {
  createOne
}

export default UserService;