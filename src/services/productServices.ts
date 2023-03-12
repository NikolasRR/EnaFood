import productRepo from "../repositories/productRepo.js";

async function getByPage(page: string) {
  return await productRepo.getByPage(parseInt(page) - 1);
}

const productService = {
  getByPage
}

export default productService;