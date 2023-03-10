import { Request, Response } from "express";

import productService from "../services/productServices.js";

async function getProducts(req: Request, res: Response) {
  const products = await productService.getAll();

  res.send(products);
}

const controllers = {
  getProducts
}

export default controllers;