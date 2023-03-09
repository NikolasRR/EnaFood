import { Router } from "express";

import controllers from "../controllers/userControllers.js";

const userRouter = Router();
userRouter
  .post('/sign-up', controllers.createUser)
  .post('/sign-in', controllers.logUserIn);

export default userRouter;