import { Request, Response } from "express";

import productService from "../services/productServices.js";

async function getProducts(req: Request, res: Response) {
  const page = req.query.page as string;
  const products = await productService.getByPage(page);

  res.send(products);
}

const controllers = {
  getProducts
}

export default controllers;