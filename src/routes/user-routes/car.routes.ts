import { Router } from "express";
import CarController from "../../controllers/car.controller";
import { container } from "tsyringe";
import CarModel from "../../models/car.model";
import adminValidation from "../../middlewares/adminValidation.middlewares";
import idValidationMiddleware from "../../middlewares/id.middlewares";

const userRouter = Router();
container.registerInstance("CarModel", CarModel);

const carController = new CarController();

userRouter.param("id", idValidationMiddleware);

userRouter.get("/", carController.get);
userRouter.get("/available", carController.getAvailableCars);
userRouter.post("/", adminValidation, carController.post);
userRouter.put("/:id", adminValidation, carController.update);
userRouter.get("/:id", carController.getById);
userRouter.delete("/:id", adminValidation, carController.delete);

export default userRouter;
