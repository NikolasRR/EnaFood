import { Router } from "express";

import controllers from "../controllers/productControllers.js";
import validateToken from "../middlewares/tokenValidator.js";

const productRouter = Router();
productRouter
  .use(validateToken)
  .get('/products', controllers.getProducts);

export default productRouter;