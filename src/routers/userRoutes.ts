import { Router } from "express";

import controllers from "../controllers/userControllers.js";
import middleware from "../middlewares/userMiddlewares.js";

const userRouter = Router();
userRouter
  .post('/sign-up', middleware.validateCreationData, controllers.createUser)
  .post('/sign-in', middleware.validateLogInData, controllers.logUserIn);

export default userRouter;