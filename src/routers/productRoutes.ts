import { Router } from "express";

import controllers from "../controllers/productControllers.js";

const productRouter = Router();
productRouter
  .get('/products', controllers.getProducts);

export default productRouter;