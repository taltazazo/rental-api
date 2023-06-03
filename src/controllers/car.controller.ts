import "reflect-metadata";
import { autoInjectable } from "tsyringe";
import CarService from "../services/car.service";
import BaseController from "./base.controller";
import { CarSchemaValidation } from "../models/car.model";
import NotFoundError from "../errors/NotFoundError";

@autoInjectable()
export default class CarController extends BaseController {
  service: CarService;
  constructor(service?: CarService, schemaValidation?: CarSchemaValidation) {
    super(service, schemaValidation);
  }

  getAvailableCars = async (_req: any, res: any) => {
    const cars = await this.service.getAvailableCars();
    if (cars.length === 0) {
      throw new NotFoundError("No cars found");
    }
    res.send(cars);
  };
}
