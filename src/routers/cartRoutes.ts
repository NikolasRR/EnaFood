import { Router } from "express";

import controllers from "../controllers/cartControllers.js";
import validateToken from "../middlewares/tokenValidator.js";

const cartRouter = Router();
cartRouter
  .use(validateToken)
  .post('/cart', controllers.addToCart)
  .delete('/cart', controllers.deleteFromCart);

export default cartRouter;