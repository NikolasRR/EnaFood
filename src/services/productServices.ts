import productRepo from "../repositories/productRepo.js";

async function getAll() {
  return await productRepo.get();
}

const productService = {
  getAll
}

export default productService;