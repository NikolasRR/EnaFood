import { ProductOnCart } from "@prisma/client";

import prisma from "../database/db.js";

async function create(userId: string) {
  await prisma.cart.create({
    data: {
      userId: userId
    }
  })
}

async function getByUserId(userId: string) {
  return await prisma.cart.findUnique({
    where: {
      userId: userId
    }
  })
}

async function updateByUserId(userId: string, newCart: ProductOnCart[]) {
  await prisma.cart.update({
    where: {
      userId: userId
    },
    data: {
      products: newCart
    }
  })
}

const cartRepo = {
  create,
  getByUserId,
  updateByUserId
}

export default cartRepo;