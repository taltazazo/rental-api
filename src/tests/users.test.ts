const { getMockReq, getMockRes } = require("@jest-mock/express");
import UserController from "../controllers/user.controller";
import { container } from "tsyringe";
import UserService from "../services/user.service";
import * as db from "./setup";
import UserModel, { UserSchemaValidation } from "../models/user.model";
import ValidationError from "../errors/ValidationError";

const validUserData = {
  name: "fist user",
  email: "first@gmail.com",
  role: "admin",
};

describe("test users controller - integration", () => {
  beforeAll(async () => {
    await db.setUp();
  });

  beforeEach(() => {
    container.registerInstance("UserModel", UserModel);
    container.registerInstance("UserSchemaValidation", UserSchemaValidation);
    const userService = new UserService();
    container.registerInstance(UserService, userService);
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  afterEach(async () => {
    await db.dropCollections();
    container.clearInstances();
  });

  it("get all users function - should return mock user data", async () => {
    const userController = container.resolve(UserController);

    const validUser = new UserModel(validUserData);
    await validUser.save();

    const req = getMockReq();
    const { res } = getMockRes();

    await userController.get(req, res);

    // expect res.send to be called with mock data that contains the validUserData
    expect(res.send).toBeCalledWith(
      expect.arrayContaining([expect.objectContaining(validUserData)])
    );
  });
  it("post function - should save mock user data", async () => {
    const userController = container.resolve(UserController);

    const req = getMockReq({ body: validUserData });

    const { res } = getMockRes();

    await userController.post(req, res);

    // expect res.send to be called with mock data that contains the validUserData
    expect(res.send).toBeCalledWith(expect.objectContaining(validUserData));
  });
  it("post function - should return 400 missing prop", () => {
    const userController = container.resolve(UserController);

    const invalidUserData = {
      email: "first@gmail.com",
    };

    const req = getMockReq({ body: invalidUserData });

    const { res } = getMockRes();

    expect(userController.post(req, res)).rejects.toThrowError(ValidationError);
  });
});
describe("test users controller - unit", () => {
  // unit test
  it("get function - should return mock data", async () => {
    const mockDataToReturn = ["mocking"];
    container.registerInstance("UserModel", {});
    container.registerInstance("UserSchemaValidation", {});

    const userService = new UserService();

    userService.get = jest
      .fn()
      .mockReturnValue(mockDataToReturn) as jest.MockedFunction<any>;

    container.registerInstance(UserService, userService);

    const userController = container.resolve(UserController);

    const req = getMockReq({});
    const { res } = getMockRes();
    await userController.get(req, res);

    expect(res.send).toHaveBeenCalledWith(mockDataToReturn);
  });
});
