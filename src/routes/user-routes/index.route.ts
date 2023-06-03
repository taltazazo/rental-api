import { Router } from "express";
import userRouter from "./user.routes";
import carRouter from "./car.routes";
import authMiddleware from "../../middlewares/auth.middlewares";
import rentalRouter from "./rental.routes";

const router = Router();

router.use(authMiddleware);

router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/rental", rentalRouter);

export default router;
