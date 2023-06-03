import { Router } from "express";
import RentalController from "../../controllers/rental.controller";
import { container } from "tsyringe";
import RentalModel from "../../models/rental.model";
import adminValidation from "../../middlewares/adminValidation.middlewares";
import idValidationMiddleware from "../../middlewares/id.middlewares";

const rentalRouter = Router();
container.registerInstance("RentalModel", RentalModel);

const rentalController = new RentalController();

rentalRouter.param("id", idValidationMiddleware);

rentalRouter.get("/", rentalController.get);
rentalRouter.post("/", adminValidation, rentalController.post);
rentalRouter.put("/:id", adminValidation, rentalController.update);
rentalRouter.get("/:id", rentalController.getById);
rentalRouter.delete("/:id", adminValidation, rentalController.delete);

export default rentalRouter;
