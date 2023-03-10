import { Router } from "express";

import controllers from "../controllers/productControllers.js";
import middlewares from "../middlewares/productMiddlewares.js";
import validateToken from "../middlewares/tokenValidator.js";

const productRouter = Router();
productRouter
  .use(validateToken)
  .get('/products', middlewares.validatePageNumber, controllers.getProducts);

export default productRouter;