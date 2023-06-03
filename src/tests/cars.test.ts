const { getMockReq, getMockRes } = require("@jest-mock/express");
import CarController from "../controllers/car.controller";
import { container } from "tsyringe";
import CarService from "../services/car.service";
import * as db from "./setup";
import CarModel, { CarSchemaValidation } from "../models/car.model";

const validCarData = {
  name: "Tesla",
  price: 100000,
  size: "mid",
};

describe("test cars controller - integration", () => {
  beforeAll(async () => {
    await db.setUp();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  afterEach(async () => {
    await db.dropCollections();
    container.clearInstances();
  });

  it("post function - should save mock car data", async () => {
    container.registerInstance("CarModel", CarModel);
    const validation = new CarSchemaValidation();
    container.registerInstance("CarSchemaValidation", validation);
    const carService = new CarService();
    container.registerInstance(CarService, carService);
    const carController = container.resolve(CarController);

    const req = getMockReq({ body: validCarData });

    const { res } = getMockRes();

    await carController.post(req, res);

    // expect res.send to be called with mock data that contains the validCarData
    expect(res.send).toBeCalledWith(expect.objectContaining(validCarData));
  });
});
