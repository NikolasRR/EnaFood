import { Router } from "express";

import productRouter from "./productRoutes.js";
import userRouter from "./userRoutes.js";

const router = Router();
router
  .use(userRouter)
  .use(productRouter)

export default router;