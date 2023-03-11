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

const productRepo = {
  get,
  getManyByIds
}

export default productRepo;