import { ProductOnCart } from "@prisma/client";

import cartRepo from "../repositories/cartRepo.js";
import productRepo from "../repositories/productRepo.js";

async function checkProductExistence(productId: string) {
  const product = await productRepo.getOneById(productId);
  if (product === null) throw { type: "not found", message: "product does not exist" };
}

async function addNewProduct(userId: string, newProduct: ProductOnCart) {
  await checkProductExistence(newProduct.productId);
  const currentCart = await cartRepo.getByUserId(userId);

  const productAlreadyOnCart = currentCart.products.find(product => product.productId === newProduct.productId);
  if (productAlreadyOnCart) {
    updateAmount(userId, newProduct);
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

async function clearCart(userId: string) {
  await cartRepo.updateByUserId(userId, []);
}

async function getCart(userId: string) {
  const cart = await cartRepo.getByUserId(userId);
  const productsIds = cart.products.map(product => product.productId);

  const products = await productRepo.getManyByIds(productsIds);

  return cart.products.map(product => {
    const productInfo = products.find(prodInfo => prodInfo.id === product.productId);
    return {
      id: product.productId,
      amount: product.amount,
      name: productInfo.name,
      price: productInfo.price
    }
  })
}

async function updateAmount(userId: string, updatedProduct: ProductOnCart) {
  await checkProductExistence(updatedProduct.productId);
  let currentCart = await cartRepo.getByUserId(userId);

  const indexOfProduct = currentCart.products.findIndex(product => product.productId === updatedProduct.productId);
  if (indexOfProduct === -1) {
    addNewProduct(userId, updatedProduct);
    return;
  }

  const newCart = [...currentCart.products];
  newCart[indexOfProduct].amount = updatedProduct.amount;
  await cartRepo.updateByUserId(userId, newCart);
}

const cartService = {
  addNewProduct,
  deleteProduct,
  clearCart,
  updateAmount,
  getCart
}

export default cartService;