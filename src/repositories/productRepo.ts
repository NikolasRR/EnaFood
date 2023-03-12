import prisma from "../database/db.js";

async function getByPage(page: number) {
  return await prisma.product.findMany({
    take: 10,
    skip: page*10,
    orderBy: {
      id: 'desc'
    }
  });
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
  getByPage,
  getManyByIds,
  getOneById
}

export default productRepo;