import { Router } from "express";

import cartRouter from "./cartRoutes.js";
import productRouter from "./productRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();
router
  .use(userRouter)
  .use(productRouter)
  .use(cartRouter);

export default router;