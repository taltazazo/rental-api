import { Router } from "express";
import UserController from "../../controllers/user.controller";
import { container } from "tsyringe";
import UserModel from "../../models/user.model";
import idValidationMiddleware from "../../middlewares/id.middlewares";

const userRouter = Router();
// the DI of mongoose model can be improved by creating interface DBmodel and class mongoModel which implements it
container.registerInstance("UserModel", UserModel);

userRouter.param("id", idValidationMiddleware);

const userController = new UserController();

userRouter.get("/", userController.get);
userRouter.post("/", userController.post);
userRouter.get("/:id", userController.getById);
userRouter.delete("/:id", userController.delete);

export default userRouter;
