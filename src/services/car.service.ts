import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import CarSI from "../interfaces/car.interface";
import BaseService from "./base.service";
import { Model } from "mongoose";

@autoInjectable()
export default class CarService extends BaseService<CarSI> {
  constructor(@inject("CarModel") model?: Model<CarSI>) {
    super(model);
  }

  getAvailableCars = async () => {
    //TODO:: this aggregation should be in CarQueryBuilder
    return await this.model.aggregate([
      {
        $lookup: {
          from: "rentals",
          localField: "_id",
          foreignField: "carId",
          as: "rentals",
        },
      },
      {
        $unwind: {
          path: "$rentals",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $expr: {
            $or: [
              {
                $gt: ["$rentals.start", new Date()],
              },
              {
                $lt: ["$rentals.end", new Date()],
              },
            ],
          },
        },
      },
      {
        $project: {
          rentals: 0,
        },
      },
    ]);
  };
}
