import { ProductOnCart } from "@prisma/client";
import { Request, Response } from "express";

import cartService from "../services/cartServices.js";

async function addToCart(req: Request, res: Response) {
  const userId = res.locals.userId as string;
  const product = req.body as ProductOnCart;

  await cartService.addNewProduct(userId, product);

  res.sendStatus(200);
}

const controllers = {
  addToCart
}

export default controllers;