import prisma from "../database/db.js";
import { UserBody } from "../types/userTypes.js";

async function create(user: UserBody) {
  await prisma.user.create({
    data: user
  })
}

const UserRepo = {
  create
}

export default UserRepo;