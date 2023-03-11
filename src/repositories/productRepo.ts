import prisma from "../database/db.js";

async function get() {
  return await prisma.product.findMany();
}

async function getManyByIds(productsIds: string[]) {
  return await prisma.product.findMany({
    where: {
      id: { in: productsIds }
    }
  });
}

async function getOneById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id: id
    }
  })
}

const productRepo = {
  get,
  getManyByIds,
  getOneById
}

export default productRepo;