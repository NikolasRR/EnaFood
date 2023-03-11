import { ProductOnCart } from "@prisma/client";
import { Request, Response } from "express";

import cartService from "../services/cartServices.js";

async function addToCart(req: Request, res: Response) {
  const userId = res.locals.userId as string;
  const product = req.body as ProductOnCart;

  await cartService.addNewProduct(userId, product);

  res.sendStatus(200);
}

async function deleteFromCart(req: Request, res: Response) {
  const userId = res.locals.userId as string;
  const productId = req.body.productId as string;

  await cartService.deleteProduct(userId, productId);

  res.sendStatus(200);
}

const controllers = {
  addToCart,
  deleteFromCart
}

export default controllers;