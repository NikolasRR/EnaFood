import { PrismaClient } from "@prisma/client";
import prisma from "../database/db.js";
import { UserBody } from "../types/userTypes.js";
import cartRepo from "./cartRepo.js";

async function create(userData: UserBody) {
  await prisma.$transaction(async (prismaClient: PrismaClient) => {
    console.log("checkpoint");
    
    const user = await prismaClient.user.create({
      data: userData
    });
    if (!user) throw { type: "database" };
    console.log("checkpoint 2");

    await cartRepo.create(user.id);
  })
}

async function getByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email
    }
  })
}

const UserRepo = {
  create,
  getByEmail
}

export default UserRepo;