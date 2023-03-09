import prisma from "../database/db.js";
import { UserBody } from "../types/userTypes.js";

async function create(user: UserBody) {
  await prisma.user.create({
    data: user
  })
}

async function get(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

const UserRepo = {
  create,
  get
}

export default UserRepo;