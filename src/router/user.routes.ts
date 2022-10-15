import { Router } from "express";
import { deleteUserController, listUsersController, updateUserController, userCreateController } from "../controllers/user.controller";
import adminValidationMiddleWare from "../middlewares/adminValidation.middleware";
import isActiveValidationMiddleWare from "../middlewares/isActiveValidation.middleware";
import tokenAuthValidationMiddleware from "../middlewares/tokenAuthValidation.middleware";


const userRoutes = Router()

userRoutes.post("", userCreateController );
userRoutes.get("", tokenAuthValidationMiddleware, adminValidationMiddleWare, listUsersController)
userRoutes.patch("/:id", tokenAuthValidationMiddleware, updateUserController)
userRoutes.delete("/:id", tokenAuthValidationMiddleware, adminValidationMiddleWare, isActiveValidationMiddleWare, deleteUserController);


export default userRoutes