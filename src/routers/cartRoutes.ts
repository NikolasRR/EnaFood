import { Router } from "express";

import controllers from "../controllers/cartControllers.js";
import middleware from "../middlewares/cartMiddlewares.js";
import validateToken from "../middlewares/tokenValidator.js";

const cartRouter = Router();
cartRouter
  .use(validateToken)
  .post('/cart', middleware.validateForAdditionAndUpdate, controllers.addToCart)
  .put('/cart', middleware.validateForAdditionAndUpdate, controllers.updateAmount)
  .get('/cart', controllers.getCartProducts)
  .delete('/cart', middleware.validateForDeletion, controllers.deleteFromCart)
  .delete('/cart/all', controllers.clearCartProducts);

export default cartRouter;