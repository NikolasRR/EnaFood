import { ProductOnCart } from "@prisma/client";

import cartRepo from "../repositories/cartRepo.js";

async function addNewProduct(userId: string, newProduct: ProductOnCart) {
  const currentCart = await cartRepo.getByUserId(userId);

  const productAlreadyOnCart = currentCart.products.find(product => product.productId === newProduct.productId);
  if (productAlreadyOnCart) {
    updateAmount();
    return;
  }

  const newCart = [...currentCart.products, newProduct];
  await cartRepo.updateByUserId(userId, newCart);
}

async function deleteProduct(userId: string, productId: string) {
  const currentCart = await cartRepo.getByUserId(userId);
  
  const newCart = currentCart.products.filter(product => product.productId !== productId);
  await cartRepo.updateByUserId(userId, newCart);
}

async function clear() {
  
}

async function updateAmount() {
  console.log("ran updateAmount");
  
}

const cartService = {
  addNewProduct,
  deleteProduct,
  clear,
  updateAmount
}

export default cartService;