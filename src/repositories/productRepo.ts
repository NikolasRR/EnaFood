import prisma from "../database/db.js";

async function get() {
  return await prisma.product.findMany();
}

const productRepo = {
  get
}

export default productRepo;